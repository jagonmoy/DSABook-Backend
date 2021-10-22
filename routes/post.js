const express = require('express');
const postController = require('./../controller/post');
const postValidator = require("../validation/postValidator")
const postRouter = express.Router();
 
 
postRouter.get('/recent-3-posts',postController.aliasPosts,postController.getAllPosts);
postRouter.get('/',postController.getAllPosts);
postRouter.get('/:id',postController.getPost);
postRouter.post('/',postValidator.createPostValidation(),postValidator.validate,postController.createPost);
postRouter.patch('/:id',postValidator.updatePostValidation(),postValidator.validate,postController.updatePost);
postRouter.delete('/:id',postController.deletePost);
 
module.exports = postRouter ;