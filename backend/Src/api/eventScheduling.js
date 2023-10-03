const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const EventSchedulingScheme = require("../modal/eventScheduling")
const cancelledEventsSchema = require("../modal/CancelledEvents")
const { validateToken } = require("../utils/validateToken");


router.post("/create",  validateToken, upload.single("file"), async (req, res) => {
    // The "Authorization" header is present
    const authToken = req.headers["authorization"];;
    console.log("authToken", authToken)
  
  let fileName = req.body.fileName
  let folder = "Events"
  try {
    // Upload image to cloudinary
    let result
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
    }
    console.log(result)

    // Create new Event
    let eventSchedulingScheme = new EventSchedulingScheme({
      eventName: req.body.eventName,
      eventStatus: req.body.eventStatus,
      date: req.body.date,
      year: req.body.year,
      month: req.body.month,
      avatar: result?.secure_url || null,
      cloudinary_id: result?.public_id || null,
      time: req.body.time,
      description: req.body.description
    });
    // Save Event
    await eventSchedulingScheme.save()
      .then(() => res.json(eventSchedulingScheme))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (err) {
    console.log(err);
  }
});

router.post("/cancelledEvents", validateToken, async (req, res) => {
  try {

    // Create Cancelled Event
    let cancelledEventScheme = new cancelledEventsSchema({
      eventName: req.body.eventName,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description
    });
    // Save Cancelled Event
    await cancelledEventScheme.save()
      .then(() => res.json(cancelledEventScheme))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (err) {
    console.log(err);
  }
});

router.get("/vieweCancelledEvents", async (req, res) => {
  try {
    await cancelledEventsSchema.find()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (err) {
    console.log(err);
  }

});

router.get("/viewevents", async (req, res) => {
  try {
    await EventSchedulingScheme.find()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (err) {
    console.log(err);
  }

});

router.get("/viewevent/:id", async (req, res) => {
  try {
    await EventSchedulingScheme.findById(req.params.id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (err) {
    console.log(err);
  }

});

router.put("/update/:id", validateToken, upload.single("file"), async (req, res) => {
  let fileName = req.body.fileName
  let folder = "Events"

  try {
    let EventSchedule = await EventSchedulingScheme.findById(req.params.id);
    // Delete file from cloudinary

    // Upload file to cloudinary
    let result;
    if (req.file) {
      if (EventSchedule.cloudinary_id) {
        await cloudinary.uploader.destroy(EventSchedule.cloudinary_id);
      }
      result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
    }
    let data = {
      eventName: req.body.eventName || EventSchedule.eventName,
      eventStatus: req.body.eventStatus || EventSchedule.eventStatus,
      date: req.body.date || EventSchedule.date,
      year: req.body.year || EventSchedule.year,
      month: req.body.month || EventSchedule.month,
      avatar: result?.secure_url || EventSchedule.avatar,
      cloudinary_id: result?.public_id || EventSchedule.cloudinary_id,
      time: req.body.time || EventSchedule.time,
      description: req.body.description || EventSchedule.description,
    };
    EventSchedule = await EventSchedulingScheme.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(EventSchedule);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  if (req.params.id) {
    //delete proposal data
    await EventSchedulingScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
      .catch((err) => { res.status(500).send(err) })
  }
});


router.get("/search/:id", async (req, res) => {

  await EventSchedulingScheme.find({ 'eventName': { $regex: '.*' + req.params.id + '.*' } }).then((data) => { res.status(200).send(data) })
    .catch((err) => { res.status(500).send(err) })
});

router.get("/filter", async (req, res) => {
  const filters = req.query;
  let events = await EventSchedulingScheme.find()
  if (events) {
    events = await events.filter(event => {
      let isValid = true;
      for (key in filters) {
        console.log(key, event[key], filters[key]);
        isValid = isValid && event[key] == filters[key];
      }
      return isValid;
    })
    res.send(events);
  }


});

module.exports = router;