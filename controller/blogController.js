const response = require("../utils/response/blogResponse")
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
   if (typeof blogs === "string") {
       req.negotiate({
           "application/json": function () { response.JSONErrorResponse(404,blogs,res,"json")},
           "application/xml" :  function () { response.XMLErrorResponse(404,blogs,res,"xml")},
           "application/default": function() { response.JSONErrorResponse(404,blogs,res,"json")},
       });
       return ;
   }
   else {
       req.negotiate({
           "application/json": function () { response.JSONBlogResponse(200,blogs,res,"json")},
           "application/xml" :  function () { response.XMLBlogResponse(200,blogs,res,"xml")},
           "application/default": function() { response.JSONBlogResponse(200,blogs,res,"json")},
       });
   }
 } 
 catch (error) {
       req.negotiate({
           "application/json": function () { response.JSONErrorResponse(404,error.message,res,"json")},
           "application/xml" :  function () { response.XMLErrorResponse(404,error.message,res,"xml")},
           "application/default": function() { response.JSONErrorResponse(404,error.message,res,"json")},
       });
 }
};


exports.getBlog = async (req, res) => {
 try {
   const blog = await blogService.getBlog(req);
   if(typeof blog === "string") return response.errorBlogResponse(404,blog,res)
   req.negotiate({
    "application/json": function ()  { response.JSONBlogResponse(200,blog,res)},
    "application/xml" :  function () { response.XMLBlogResponse(200,blog,res)},
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
    "application/xml" :  function () { response.XMLBlogResponse(201,newBlog,res)},
    "application/default": function() { response.defaultBlogReponse(201,newBlog,res)}
 });
} catch (error) {
  response.errorBlogResponse(424,"Blog Creation Unsuccessful",res);
}
};
exports.updateBlog = async (req, res) => {
 try {
  let blog = await blogService.getBlog(req);
  if(typeof blog === "string") return response.errorBlogResponse(404,blog,res)

  if (blog.username !== req.body.username) return response.errorBlogResponse(403,"Not Have permission to Update",res);

  blog = await blogService.updateBlog(req);
   req.negotiate({
    "application/json": function () {  response.JSONBlogResponse(200,blog,res)},
    "application/xml" :  function () { response.XMLBlogResponse(200,blog,res)},
    "application/default": function() { response.defaultBlogReponse(200,blog,res)}
 });
} catch (err) {
  response.errorBlogResponse(404,err.message,res);
}
};
exports.deleteBlog = async (req, res) => {
 try {
   let blog = await blogService.getBlog(req);
   if(typeof blog === "string") return response.errorBlogResponse(404,blog,res)

   if (blog.username !== req.body.username) return response.errorBlogResponse(403,"Not Have permission to delete",res);

   await blogService.deleteBlog(req);
   req.negotiate({
    "application/json": function () {  response.JSONBlogResponse(204,null,res)},
    "application/xml" :  function () { response.XMLBlogResponse(204,null,res)},
    "application/default": function() { response.defaultBlogReponse(200,null,res)}
 });
} catch (err) {
  response.errorBlogResponse(404,"Blog deletion Unsuccessful",res);
}
};