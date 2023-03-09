const express = require('express');
const authController = require('../controller/authController');
const userValidator = require("../validation/userValidator");
const authMiddleware = require("../middleware/authMiddleware")
const authRouter = express.Router();
 
 
authRouter.post('/sign-up',authMiddleware.checkStatus,userValidator.signupUserValidation(),userValidator.validate,authController.signup);
authRouter.post('/sign-in',authMiddleware.checkStatus,userValidator.signinUserValidation(),userValidator.validate,authController.signin);
authRouter.post('/sign-out',authMiddleware.refreshTokenCheck,authController.signout);
authRouter.post('/access-token-renewal',authMiddleware.refreshTokenCheck,authController.getNewAccessToken);

module.exports = authRouter;