const express = require('express');
const blogController = require('../controller/blogController');
const blogValidator = require("../validation/blogValidator");
const authController = require("../controller/authController")
const blogRouter = express.Router();
 
blogRouter.get('/',blogController.getAllBlogs);
blogRouter.get('/:id',blogController.getBlog);
blogRouter.post('/',authController.protect,blogValidator.createBlogValidation(),blogValidator.validate,blogController.createBlog);
blogRouter.patch('/:id',blogValidator.updateBlogValidation(),blogValidator.validate,authController.protect,authController.restrictTo(),blogController.updateBlog);
blogRouter.delete('/:id',authController.protect,authController.restrictTo(),blogController.deleteBlog);
 
module.exports = blogRouter;