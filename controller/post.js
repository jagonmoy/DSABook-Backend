const Post = require("../models/post");
const postFormat = require("../format/post")
const express = require("express"),
 negotiate = require("express-negotiate");
 
 
exports.getAllPosts = async (req, res) => {
 try {
   const posts = await Post.find();
   req.negotiate({
       "application/json": function () {  postFormat.JSONReponse(200,posts,res)},
       "application/xml" :  function () { postFormat.XMLResponse(200,posts,res)},
       "application/default": function() { postFormat.defaultResponse(200,posts,res)}
   });
 } catch (err) {
     postFormat.errorResponse(404,res);
 }
};
exports.getPost = async (req, res) => {
 try {
   const post = await Post.findById(req.params.id);
   req.negotiate({
    "application/json": function () {  postFormat.JSONReponse(200,post,res)},
    "application/xml" :  function () { postFormat.XMLResponse(200,post,res)},
    "application/default": function() { postFormat.defaultResponse(200,posts,res)}
 });
} catch (err) {
  postFormat.errorResponse(404,res);
}
};
exports.createPost = async (req, res) => {
 try {
   const newPost = await Post.create(req.body);
   req.negotiate({
    "application/json": function () {  postFormat.JSONReponse(201,newPost,res)},
    "application/xml" :  function () { postFormat.XMLResponse(201,newPost,res)},
    "application/default": function() { postFormat.defaultResponse(200,posts,res)}
 });
} catch (err) {
  postFormat.errorResponse(404,res);
}
};
exports.updatePost = async (req, res) => {
 try {
   const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
     new: true,
   });
   req.negotiate({
    "application/json": function () {  postFormat.JSONReponse(200,post,res)},
    "application/xml" :  function () { postFormat.XMLResponse(200,post,res)},
    "application/default": function() { postFormat.defaultResponse(200,posts,res)}
 });
} catch (err) {
  postFormat.errorResponse(404,res);
}
};
exports.deletePost = async (req, res) => {
 try {
   await Post.findByIdAndDelete(req.params.id);
   req.negotiate({
    "application/json": function () {  postFormat.JSONReponse(204,null,res)},
    "application/xml" :  function () { postFormat.XMLResponse(204,null,res)},
    "application/default": function() { postFormat.defaultResponse(200,posts,res)}
 });
} catch (err) {
  postFormat.errorResponse(404,res);
}
};
