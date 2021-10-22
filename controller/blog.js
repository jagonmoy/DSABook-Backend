const blogFormat = require("../format/blog")
const {Database} = require("../service/blog/blogService")
const express = require("express"),
 negotiate = require("express-negotiate");

 const database = new Database();

exports.aliasBlogs = async (req,res,next) => {
  req.query.limit = '3';
  req.query.sort = '-createdAt,userName';
  req.query.fields = 'userName,blogHeadline,blogDescription'
  next();
}



exports.getAllBlogs = async (req, res) => {
 try {
   console.log("Shob blog ki dekha jai")
   const blogs = await database.findAllBlogs(req);
   if (!blogs) throw new Error;
   req.negotiate({
       "application/json": function () {  blogFormat.JSONReponse(200,blogs,res)},
       "application/xml" :  function () { blogFormat.XMLResponse(200,blogs,res)},
       "application/default": function() { blogFormat.defaultResponse(200,blogs,res)}
   });
 } catch (err) {
     blogFormat.errorResponse(404,res);
 }
};
exports.getBlog = async (req, res) => {
 try {
   const blog = await database.findBlog(req);
   req.negotiate({
    "application/json": function ()  { blogFormat.JSONReponse(200,blog,res)},
    "application/xml" :  function () { blogFormat.XMLResponse(200,blog,res)},
    "application/default": function(){ blogFormat.defaultResponse(200,blog,res)}
 });
} catch (err) {
  blogFormat.errorResponse(404,res);
}
};
exports.createBlog = async (req, res) => {
 try {
   const newBlog = await database.createBlog(req);
   req.negotiate({
    "application/json": function () {  blogFormat.JSONReponse(201,newBlog,res)},
    "application/xml" :  function () { blogFormat.XMLResponse(201,newBlog,res)},
    "application/default": function() { blogFormat.defaultResponse(200,newBlog,res)}
 });
} catch (err) {
  blogFormat.errorResponse(404,res);
}
};
exports.updateBlog = async (req, res) => {
 try {
  const blog = await database.updateBlog(req);
   req.negotiate({
    "application/json": function () {  blogFormat.JSONReponse(200,blog,res)},
    "application/xml" :  function () { blogFormat.XMLResponse(200,blog,res)},
    "application/default": function() { blogFormat.defaultResponse(200,blog,res)}
 });
} catch (err) {
  blogFormat.errorResponse(404,res);
}
};
exports.deleteBlog = async (req, res) => {
 try {
   await database.deleteBlog(req);
   req.negotiate({
    "application/json": function () {  blogFormat.JSONReponse(204,null,res)},
    "application/xml" :  function () { blogFormat.XMLResponse(204,null,res)},
    "application/default": function() { blogFormat.defaultResponse(200,blogs,res)}
 });
} catch (err) {
  blogFormat.errorResponse(404,res);
}
};
