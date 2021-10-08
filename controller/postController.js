const Post = require('../models/postModel');

exports.getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find(); 
        res.status(200).json({
            status : 'success' ,
            data: {
                posts
            }
        });
    } catch (err) {
        res.status(404).json({
            status : 'failed' ,
            message : "invalid request"
        })
    }
}
exports.getPost = async (req,res) => {    
    try {
        const post = await Post.findById(req.params.id); 
        res.status(200).json({
            status : 'success' ,
            data: {
                post
            }
        });
    } catch (err) {
        res.status(404).json({
            status : 'failed' ,
            message : "invalid request"
        })
    }
}
exports.createPost = async (req,res) => {
    try {
        const newPost = await Post.create(req.body);  
        res.status(201).json({
            status : 'success' ,
            data: {
                newPost
            } 
        });
    } catch (err) {
        res.status(400).json({
            status : "failure" ,
            message : "invalid Input"
        })
    } 
}
exports.updatePost = async (req,res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{
            new : true
        }); 
        res.status(200).json({
            status : 'success' ,
            data: {
                post
            }
        });
    } catch (err) {
        res.status(404).json({
            status : 'failed' ,
            message : "invalid request"
        })
    }
}
exports.deletePost = async (req,res) => {
    try {
        await Post.findByIdAndDelete(req.params.id); 
        res.status(204).json({
            status : "Deleted Successfully!!" ,
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status : 'failed' ,
            message : "invalid request"
        })
    }
}
