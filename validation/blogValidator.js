const {validationResult,check } = require('express-validator')
 
exports.createBlogValidation = () => {
 return [
  check('blogHeadline','Headline must be between 5 to 30 letter').trim().isLength({ min: 5 , max: 30}),
  check('blogDescription','description must be between 5 to 2000 letter').trim().isLength({ min: 5 , max: 2000})
 ]
}
 
exports.updateBlogValidation = () => {
  return [
   check('blogHeadline','Headline must be between 5 to 30 letter').if(check('blogHeadline').exists()).isLength({ min: 5 , max: 30}),
   check('blogDescription','description must be between 5 to 2000 letter').if(check('blogDescription').exists()).isLength({ min: 5 , max: 2000})
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