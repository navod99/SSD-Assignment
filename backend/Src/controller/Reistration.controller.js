const User = require('../modal/Registretion');
const Login = require('../modal/login');
const bcrypt = require('bcrypt');

//Add project

const addUser = async (req, res) => {
    const saltRounds = 10;

    if (req.body) {
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            // Create a new Login instance
            const loginuser = new Login({
                email: req.body.email,
                password: hashedPassword,
                role: req.body.occupation
            });

            // Create a new User instance
            const user = new User(req.body);

            // Use Promise.all to save both models concurrently
            const [userResult, loginResult] = await Promise.all([user.save(), loginuser.save()]);

            // Send a response after both saves have completed
            res.status(200).send({ userData: userResult, loginData: loginResult });
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.status(400).send({ message: 'Bad Request' });
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