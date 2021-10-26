const blogResponse = require("../response/blogResponse")
const {BlogService} = require("../service/blogService")
const {MongoDao} = require("../dao/mongoDao")
const {MysqlDao} = require("../dao/mysqlDao")
const express = require("express"),
 negotiate = require("express-negotiate");


const currentDatabase = new MongoDao();
// const currentDatabase = new MysqlDao();
const blogService = new BlogService(currentDatabase);


exports.aliasBlogs = async (req,res,next) => {
  req.query.limit = '3';
  req.query.sort = '-createdAt,userName';
  req.query.fields = 'userName,blogHeadline,blogDescription,createdAt,_id'
  next();
}



exports.getAllBlogs = async (req, res) => {
 try {
   const blogs = await blogService.getAllBlogs(req);
   if (!blogs) throw new Error;
   req.negotiate({
       "application/json": function () {  blogResponse.JSONReponse(200,blogs,res)},
       "application/xml" :  function () { blogResponse.XMLResponse(200,blogs,res)},
       "application/default": function() { blogResponse.defaultResponse(200,blogs,res)}
   });
 } catch (err) {
     blogResponse.errorResponse(404,res);
 }
};
exports.getBlog = async (req, res) => {
 try {
   const blog = await blogService.getBlog(req);
   req.negotiate({
    "application/json": function ()  { blogResponse.JSONReponse(200,blog,res)},
    "application/xml" :  function () { blogResponse.XMLResponse(200,blog,res)},
    "application/default": function(){ blogResponse.defaultResponse(200,blog,res)}
 });
} catch (err) {
  blogResponse.errorResponse(404,res);
}
};
exports.createBlog = async (req, res) => {
 try {
   const newBlog = await blogService.createBlog(req);
   req.negotiate({
    "application/json": function () {  blogResponse.JSONReponse(201,newBlog,res)},
    "application/xml" :  function () { blogResponse.XMLResponse(201,newBlog,res)},
    "application/default": function() { blogResponse.defaultResponse(200,newBlog,res)}
 });
} catch (err) {
  blogResponse.errorResponse(404,res);
}
};
exports.updateBlog = async (req, res) => {
 try {
  const blog = await blogService.updateBlog(req);
   req.negotiate({
    "application/json": function () {  blogResponse.JSONReponse(200,blog,res)},
    "application/xml" :  function () { blogResponse.XMLResponse(200,blog,res)},
    "application/default": function() { blogResponse.defaultResponse(200,blog,res)}
 });
} catch (err) {
  blogResponse.errorResponse(404,res);
}
};
exports.deleteBlog = async (req, res) => {
 try {
   await blogService.deleteBlog(req);
   req.negotiate({
    "application/json": function () {  blogResponse.JSONReponse(204,null,res)},
    "application/xml" :  function () { blogResponse.XMLResponse(204,null,res)},
    "application/default": function() { blogResponse.defaultResponse(200,blogs,res)}
 });
} catch (err) {
  blogResponse.errorResponse(404,res);
}
};
