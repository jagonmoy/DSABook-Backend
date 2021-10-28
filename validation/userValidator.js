const { body, validationResult,check } = require('express-validator')
 
exports.signupUserValidation = () => {
 return [
   check('userName','name must be between 5 to 30 letters').isLength({ min: 5 , max: 30}),
   check('email','Email should be valid').isEmail(),
   check("password","password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ").isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
   check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Password Does not match');
      return true
  }),
 ]
}
 exports.signinUserValidation = () => {
  return [
    check('email','Email field should not be Empty and it should be valid').notEmpty().isEmail(),
    check('password','Password filed should not be Empty').notEmpty(),
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