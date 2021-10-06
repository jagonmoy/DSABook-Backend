const express = require('express');
const postController = require('./../controller/postController');
const postRouter = express.Router();

postRouter.param('id',postController.checkID);

postRouter.get('/',postController.getAllPosts);
postRouter.get('/:id',postController.getPost);
postRouter.post('/',postController.checkPost,postController.createPost);
postRouter.patch('/:id',postController.updatePost);
postRouter.delete('/:id',postController.deletePost);

module.exports = postRouter ;