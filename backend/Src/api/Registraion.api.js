const express = require('express')
const router = express.Router()
const userController = require('../controller/Reistration.controller');

module.exports = function () {
    router.post('/add', userController.addUser);
    router.get('/', userController.getAllUsers);
    router.put('/update/:id', userController.updateUser)
    router.delete('/delete/:id', userController.deleteUser)
    router.get('/:id',userController.findUserByID)
    return router;
}