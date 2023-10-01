const User = require('../modal/Registretion');


//Add project

const addUser = async (req, res) => {
    if (req.body) {
        const user = new User(req.body)
        await user.save()
            .then((data) => { res.status(200).send({ data: data }) })
            .catch((err) => { res.status(500).send(err) });
    }
};

const getAllUsers = async (req, res) => {
    await User.find()
        .then((data) => {
            res.status(200).send(data);
        }).catch((err) => {
            res.status(500).send(err)
        });

}

const updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => { res.status(200).send(data) })
        .catch((err) => { res.status(500).send(err) });
}

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send('Successfully Deleted'))
        .catch((err) => { res.status(500).send(err) })
}

const findUserByID = async (req, res) => {
    await User.findById(req.params.id)
        .then((data) => res.status(200).send(data))
        .catch((err) => { res.status(200).send(err) })
    
}
module.exports = {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser,
    findUserByID
}