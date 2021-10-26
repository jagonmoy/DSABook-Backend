const express = require('express');
const blogController = require('../controller/blogController');
const blogValidator = require("../validation/blogValidator")
const blogRouter = express.Router();
 
 
blogRouter.get('/recent-3-blogs',blogController.aliasBlogs,blogController.getAllBlogs);
blogRouter.get('/',blogController.getAllBlogs);
blogRouter.get('/:id',blogController.getBlog);
blogRouter.post('/',blogValidator.createBlogValidation(),blogValidator.validate,blogController.createBlog);
blogRouter.patch('/:id',blogValidator.updateBlogValidation(),blogValidator.validate,blogController.updateBlog);
blogRouter.delete('/:id',blogController.deleteBlog);
 
module.exports = blogRouter;