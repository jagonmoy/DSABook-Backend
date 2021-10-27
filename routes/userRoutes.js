const express = require('express');
const authController = require('../controller/authController');
const userValidator = require("../validation/userValidator")
const userController = require('../controller/userController');
const router = express.Router();
 
 

router.get('/',userController.getAllUsers)
router.post('/signup',userValidator.signupUserValidation(),userValidator.validate,authController.signup);
router.post('/signin',userValidator.signinUserValidation(),userValidator.validate,authController.signin);

module.exports = router;