const express = require('express');
const authController = require('../controller/authController');
const userValidator = require("../validation/userValidator");
const authMiddleware = require("../middleware/authMiddleware")
const authRouter = express.Router();
 
 
authRouter.post('/sign-up',authMiddleware.isSignedOut,userValidator.signupUserValidation(),userValidator.validate,authController.signup);
authRouter.post('/sign-in',authMiddleware.isSignedOut,userValidator.signinUserValidation(),userValidator.validate,authController.signin);
authRouter.post('/sign-out',authMiddleware.isSignedin,authController.signout);
authRouter.post('/access-token-renewal',authMiddleware.refreshTokenCheck,authController.getNewAccessToken);

module.exports = authRouter;