const express = require('express')
const router = express.Router()
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const ProjectController = require('../controller/projectController');
const Project = require('../modal/projects');

module.exports = function () {
    // router.post('/add', ProjectController.addProjects);
  router.post("/add", upload.single("file"), async (req, res) => {
  let fileName = req.body.fileName
  let folder = "Projects"
  try {
    // Upload image to cloudinary
    let result
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
    }
    console.log(result)

    // Create new Project
    let project = new Project({
      name: req.body.name,
      Date: req.body.Date,
      Description: req.body.Description,
      avatar: result?.secure_url || null,
      cloudinary_id: result?.public_id || null,
    });
    // Save Event
    await project.save()
      .then(() => res.json(project))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (err) {
    console.log(err);
  }
});
    router.get('/', ProjectController.readProjects);
    router.put('/update/:id', ProjectController.updateProjects)
    router.delete('/delete/:id', ProjectController.deleteProjects)
    router.get('/:id', ProjectController.findProjectByID)
    router.post('/search',ProjectController.search)
    return router;
}