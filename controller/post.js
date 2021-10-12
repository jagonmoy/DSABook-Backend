const postFormat = require("../format/post")
const {Mongo,SQL} = require("../service/Post")
const express = require("express"),
 negotiate = require("express-negotiate");

exports.getAllPosts = async (req, res) => {
 try {
   const database = new Mongo();
   const posts = await database.findAllPosts();
   
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
   const database = new Mongo();
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
   const database = new Mongo();
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
  const database = new Mongo();
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
   const database = new Mongo();
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
