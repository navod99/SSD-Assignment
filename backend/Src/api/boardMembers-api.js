const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const BoardMembersScheme = require("../modal/boardMembers-modal")
const { validateToken } = require("../utils/validateToken");

router.post("/create", validateToken, upload.single("file"), async (req, res) => {
  let fileName = req.body.fileName
  let folder = "Members"
  try {
    let result
    // Upload image to cloudinary
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
    }
    console.log(result)

    // Create new Event
    let boardMembersScheme = new BoardMembersScheme({
      boardMemberName: req.body.boardMemberName,
      year: req.body.year,
      designation: req.body.designation,
      avatar: result?.secure_url || null,
      cloudinary_id: result?.public_id || null,
      description: req.body.description
    });
    // Save Event
    await boardMembersScheme.save()
      .then(() => res.json(boardMembersScheme))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (err) {
    console.log(err);
  }
});

//Get All the Members
router.get("/viewMembers", async (req, res) => {
  try {
    await BoardMembersScheme.find()
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


//Update
router.put("/update/:id", validateToken, upload.single("file"), async (req, res) => {
  let fileName = req.body.fileName
  let folder = "BoardMembers"

  try {
    let BoardMembers = await BoardMembersScheme.findById(req.params.id);
    // Delete file from cloudinary

    // Upload file to cloudinary
    let result;
    if (req.file) {
      if (BoardMembers.cloudinary_id) {
        await cloudinary.uploader.destroy(BoardMembers.cloudinary_id);
      }
      result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
    }
      let data = {
        boardMemberName: req.body.boardMemberName || BoardMembers.boardMemberName,
        designation: req.body.designation || BoardMembers.designation,
        year: req.body.year|| BoardMembers.year,
        avatar: result?.secure_url || BoardMembers.avatar,
        cloudinary_id: result?.public_id || BoardMembers.cloudinary_id,
        description: req.body.description || BoardMembers.description,
      };
      BoardMembers = await BoardMembersScheme.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(BoardMembers);
    } catch (err) {
      console.log(err);
    }
});


//Delete Board Member
router.delete("/delete/:id", validateToken, async (req, res) => {
  if (req.params.id) {
    //delete proposal data
    await BoardMembersScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
      .catch((err) => { res.status(500).send(err) })
  }
});


//Search
router.get("/search/:id", async (req, res) => {

  await BoardMembersScheme.find({ 'boardMemberName': { $regex: '.*' + req.params.id + '.*' } }).then((data) => { res.status(200).send(data) })
    .catch((err) => { res.status(500).send(err) })
});

router.get("/filter", async (req, res) => {
  const filters = req.query;
  let members = await BoardMembersScheme.find()
  if (members) {
    members = await members.filter(member => {
      let isValid = true;
      for (key in filters) {
        console.log(key, member[key], filters[key]);
        isValid = isValid && member[key] == filters[key];
      }
      return isValid;
    })
    res.send(members);
  }


});

module.exports = router;