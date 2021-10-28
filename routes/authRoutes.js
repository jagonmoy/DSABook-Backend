const express = require('express');
const authController = require('../controller/authController');
const userValidator = require("../validation/userValidator")
const authRouter = express.Router();
 
 
authRouter.post('/signup',userValidator.signupUserValidation(),userValidator.validate,authController.signup);
authRouter.post('/signin',userValidator.signinUserValidation(),userValidator.validate,authController.signin);

module.exports = authRouter;