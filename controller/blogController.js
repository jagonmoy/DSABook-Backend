const response = require("../utils/response")
const {BlogService} = require("../service/blogService")
const {MongoBlogDao} = require("../dao/blog/mongoBlogDao")
const {MysqlDao} = require("../dao/blog/mysqlBlogDao")
const express = require("express"),
 negotiate = require("express-negotiate");


const currentDatabase = new MongoBlogDao();
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
       "application/json": function () {  response.JSONReponse(200,blogs,res)},
       "application/xml" :  function () { response.XMLResponse(200,blogs,res)},
       "application/default": function() { response.defaultResponse(200,blogs,res)}
   });
 } catch (err) {
     response.errorResponse(404,res);
 }
};
exports.getBlog = async (req, res) => {
 try {
   const blog = await blogService.getBlog(req);
   req.negotiate({
    "application/json": function ()  { response.JSONReponse(200,blog,res)},
    "application/xml" :  function () { response.XMLResponse(200,blog,res)},
    "application/default": function(){ response.defaultResponse(200,blog,res)}
 });
} catch (err) {
  response.errorResponse(404,res);
}
};
exports.createBlog = async (req, res) => {
 try {
   const newBlog = await blogService.createBlog(req);
   req.negotiate({
    "application/json": function () {  response.JSONReponse(201,newBlog,res)},
    "application/xml" :  function () { response.XMLResponse(201,newBlog,res)},
    "application/default": function() { response.defaultResponse(200,newBlog,res)}
 });
} catch (err) {
  response.errorResponse(404,res);
}
};
exports.updateBlog = async (req, res) => {
 try {
  const blog = await blogService.updateBlog(req);
   req.negotiate({
    "application/json": function () {  response.JSONReponse(200,blog,res)},
    "application/xml" :  function () { response.XMLResponse(200,blog,res)},
    "application/default": function() { response.defaultResponse(200,blog,res)}
 });
} catch (err) {
  response.errorResponse(404,res);
}
};
exports.deleteBlog = async (req, res) => {
 try {
   await blogService.deleteBlog(req);
   req.negotiate({
    "application/json": function () {  response.JSONReponse(204,null,res)},
    "application/xml" :  function () { response.XMLResponse(204,null,res)},
    "application/default": function() { response.defaultResponse(200,blogs,res)}
 });
} catch (err) {
  response.errorResponse(404,res);
}
};
