const User = require('../modal/login');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
//Add project

const addUser = async (req, res) => {
     
    let saltRounds = 10;
    if (req.body) {
     bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
         password = hash
         const user = new User(
            {
            email: req.body.email,
            password: password,
            role: req.body.role
            }
        )
        
         user.save()
            .then((data) => { res.status(200).send({ data: data }) })
            .catch((err) => { res.status(500).send(err) });
});
        
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

const findUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.id });

        if (user) {
            const isMatch = await bcrypt.compare(req.body.password, user.password);

            if (isMatch) {
                const token = jwt.sign({ email: user.email, role: user.role }, "secret");
                res.header('auth-token', token).send({
                    "email": user.email,
                    "role": user.role
                });
            } else {
                res.status(401).send('Invalid');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
module.exports = {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser,
   findUserByEmail
}