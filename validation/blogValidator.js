const { body, validationResult } = require('express-validator')
 
exports.createBlogValidation = () => {
 return [
   body('userName').isLength({ min: 5 , max: 30}).withMessage('name must be between 10 to 30 letter'),
   body('blogHeadline').isLength({ min: 5 , max: 30}).withMessage('Headline must be between 5 to 30 letter'),
   body('blogDescription').isLength({ min: 5 , max: 2000}).withMessage('description must be between 5 to 2000 letter'),
 ]
}
 
exports.updateBlogValidation = () => {
   return [
       body('userName').isLength({ min: 5 , max: 30}).withMessage('name must be between 10 to 30 letter'),
       body('blogHeadline').isLength({ min: 5 , max: 30}).withMessage('Headline must be between 5 to 30 letter'),
       body('blogDescription').isLength({ min: 5 , max: 2000}).withMessage('description must be between 5 to 2000 letter'),
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
