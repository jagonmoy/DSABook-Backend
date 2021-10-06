const express = require('express');
const userController = require('./../controller/userController');
const userRouter = express.Router();

userRouter.param('id',userController.checkID);

userRouter.get('/',userController.getAllUsers);
userRouter.get('/:id',userController.getUser);
userRouter.post('/',userController.checkUser,userController.createUser);
userRouter.patch('/:id',userController.updateUser);
userRouter.delete('/:id',userController.deleteUser);

module.exports = userRouter;