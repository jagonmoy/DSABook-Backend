const response = require("../utils/blogResponse")
const {BlogService} = require("../service/blogService")
const {MongoBlogDao} = require("../dao/blog/mongoBlogDao")
const {MysqlBlogDao} = require("../dao/blog/mysqlBlogDao")
const express = require("express"),
 negotiate = require("express-negotiate");


const mongoBlogDao = new MongoBlogDao();
const blogService = new BlogService(mongoBlogDao);

exports.getAllBlogs = async (req, res) => {
 try {
   const blogs = await blogService.getAllBlogs(req);
   if (!blogs) return response.errorBlogResponse(404,"Blogs not found",res);
   req.negotiate({
       "application/json": function () {  response.JSONBlogResponse(200,blogs,res)},
       "application/xml" :  function () { response.JSONBlogResponse(200,blogs,res)},
       "application/default": function() { response.defaultBlogReponse(200,blogs,res)}
   });
 } catch (error) {
     response.errorBlogResponse(404,error.message,res);
 }
};
exports.getBlog = async (req, res) => {
 try {
   const blog = await blogService.getBlog(req);
   if(!blog) return response.errorBlogResponse(404,"This Blog does not Exist",res)
   req.negotiate({
    "application/json": function ()  { response.JSONBlogResponse(200,blog,res)},
    "application/xml" :  function () { response.JSONBlogResponse(200,blog,res)},
    "application/default": function(){ response.defaultBlogReponse(200,blog,res)}
 });
} catch (error) {
  response.errorBlogResponse(404,error.message,res);
}
};
exports.createBlog = async (req, res) => {
 try {
   const newBlog = await blogService.createBlog(req);
   req.negotiate({
    "application/json": function () {  response.JSONBlogResponse(201,newBlog,res)},
    "application/xml" :  function () { response.JSONBlogResponse(201,newBlog,res)},
    "application/default": function() { response.defaultBlogReponse(201,newBlog,res)}
 });
} catch (error) {
  response.errorBlogResponse(424,"Blog Creation Unsuccessful",res);
}
};
exports.updateBlog = async (req, res) => {
 try {
  const blog = await blogService.updateBlog(req);
   req.negotiate({
    "application/json": function () {  response.JSONBlogResponse(200,blog,res)},
    "application/xml" :  function () { response.JSONBlogResponse(200,blog,res)},
    "application/default": function() { response.defaultBlogReponse(200,blog,res)}
 });
} catch (err) {
  response.errorBlogResponse(404,"Blog updation unsuccessful",res);
}
};
exports.deleteBlog = async (req, res) => {
 try {
   await blogService.deleteBlog(req);
   req.negotiate({
    "application/json": function () {  response.JSONBlogResponse(204,null,res)},
    "application/xml" :  function () { response.JSONBlogResponse(204,null,res)},
    "application/default": function() { response.defaultBlogReponse(200,null,res)}
 });
} catch (err) {
  response.errorBlogResponse(404,"Blog deletion Unsuccessful",res);
}
};