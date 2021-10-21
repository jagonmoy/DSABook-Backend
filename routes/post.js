const express = require('express');
const postController = require('./../controller/post');
const postRouter = express.Router();

postRouter.get('/recent-3-posts',postController.aliasPosts,postController.getAllPosts);
postRouter.get('/',postController.getAllPosts);
postRouter.get('/:id',postController.getPost);
postRouter.post('/',postController.createPost);
postRouter.patch('/:id',postController.updatePost);
postRouter.delete('/:id',postController.deletePost);

module.exports = postRouter ;