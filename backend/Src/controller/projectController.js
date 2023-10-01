const Project = require('../modal/projects');


//Add project

const addProjects = async (req, res) => {
    if (req.body) {
        const project = new Project(req.body)
        await project.save()
            .then((data) => { res.status(200).send({ data: data }) })
            .catch((err) => { res.status(500).send(err) });
    }
};

const readProjects = async (req, res) => {
    await Project.find()
        .then((data) => {
            res.status(200).send(data);
        }).catch((err) => {
            res.status(500).send(err)
        });

}

const updateProjects = async (req, res) => {
    await Project.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => { res.status(200).send(data) })
        .catch((err) => { res.status(500).send(err) });
}

const deleteProjects = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send('Successfully Deleted'))
        .catch((err) => { res.status(500).send(err) })
}

const findProjectByID = async (req, res) => {
    await Project.findById(req.params.id)
        .then((data) => res.status(200).send(data))
        .catch((err) => { res.status(200).send(err) })
    
}
const search = async (req, res) => {
    const search = req.body.Search
    console.log(search)
    await Project.find({ name: {$regex:search}})
        .then((data) => { res.status(200).send(data) })
    .catch((err)=>res.status(500).send(err))
}
module.exports = {
    addProjects,
    readProjects,
    updateProjects,
    deleteProjects,
    findProjectByID,
    search
}