const { body, validationResult,check } = require('express-validator')
 
exports.signupUserValidation = () => {
 return [
   check('userName','name must be between 5 to 30 letters').isLength({ min: 5 , max: 30}),
   check('email','Email should be valid').isEmail(),
   check("password","Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ").isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
   check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
          console.log(req.body.password);
          console.log(value);
      throw new Error('Password Does not match');
    }
    return true
  }),
 ]
}
 exports.signinUserValidation = () => {
  return [
    check('userName','User Name Filed Should Not be Empty').exists(),
    check('email','Email Field should Not be Empty').exists().bail().check('email','Email Should be Valid').isEmail(),
   ]
}
 
exports.validate = (req, res, next) => {
 const errors = validationResult(req)
 if (errors.isEmpty()) {
   return next()
 }
 const extractedErrors = []
 errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
 
 return res.status(422).json({
   message: "request failed",
   errors: extractedErrors
 })
}
