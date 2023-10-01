const express = require('express')
const router = express.Router()
const userController = require('../controller/Login.controller');

module.exports = function () {
    router.post('/add', userController.addUser);
    router.get('/', userController.getAllUsers);
    router.put('/update/:id', userController.updateUser)
    router.delete('/delete/:id', userController.deleteUser)
    router.post('/:id', userController.findUserByEmail)
    return router;
}