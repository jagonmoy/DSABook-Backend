const postFormat = require("../format/post")
const {Database} = require("../service/post/postService")
const express = require("express"),
 negotiate = require("express-negotiate");

 const database = new Database();

exports.aliasPosts = async (req,res,next) => {
  req.query.limit = '3';
  req.query.sort = '-createdAt,userName';
  req.query.fields = 'userName,postHeadline,postDescription'
  next();
}


exports.getAllPosts = async (req, res) => {
 try {
   const posts = await database.findAllPosts(req);
   if (!posts) throw new Error;
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
   const post = await database.findPost(req);
   req.negotiate({
    "application/json": function ()  {  postFormat.JSONReponse(200,post,res)},
    "application/xml" :  function () { postFormat.XMLResponse(200,post,res)},
    "application/default": function(){ postFormat.defaultResponse(200,post,res)}
 });
} catch (err) {
  postFormat.errorResponse(404,res);
}
};
exports.createPost = async (req, res) => {
 try {
   const newPost = await database.createPost(req);
   req.negotiate({
    "application/json": function () {  postFormat.JSONReponse(201,newPost,res)},
    "application/xml" :  function () { postFormat.XMLResponse(201,newPost,res)},
    "application/default": function() { postFormat.defaultResponse(200,newPost,res)}
 });
} catch (err) {
  postFormat.errorResponse(404,res);
}
};
exports.updatePost = async (req, res) => {
 try {
  const post = await database.updatePost(req);
   req.negotiate({
    "application/json": function () {  postFormat.JSONReponse(200,post,res)},
    "application/xml" :  function () { postFormat.XMLResponse(200,post,res)},
    "application/default": function() { postFormat.defaultResponse(200,post,res)}
 });
} catch (err) {
  postFormat.errorResponse(404,res);
}
};
exports.deletePost = async (req, res) => {
 try {
   await database.deletePost(req);
   req.negotiate({
    "application/json": function () {  postFormat.JSONReponse(204,null,res)},
    "application/xml" :  function () { postFormat.XMLResponse(204,null,res)},
    "application/default": function() { postFormat.defaultResponse(200,posts,res)}
 });
} catch (err) {
  postFormat.errorResponse(404,res);
}
};
