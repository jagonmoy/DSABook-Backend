const contentNegotiation = require("../utils/contentNegotiation")
const { BlogService } = require("../service/blogService");
const { MongoBlogDao } = require("../dao/blog/mongoBlogDao");
const { MysqlBlogDao } = require("../dao/blog/mysqlBlogDao");

const mongoBlogDao = new MongoBlogDao();
const blogService = new BlogService(mongoBlogDao);

exports.blogService = blogService ;

exports.getAllBlogs = async (req, res) => {
  try {
      const blogs = await blogService.getAllBlogs(req);
      if (typeof blogs === "string") return contentNegotiation.sendErrorResponse(404,blogs,req,res)
      else return contentNegotiation.sendResponse(200,blogs,req,res)
  } 
  catch (error) { 
    return contentNegotiation.sendErrorResponse(404,error.message,req,res)    
  }
};


exports.getBlog = async (req, res) => {
  try {
    const blog = await blogService.getBlog(req);
    if(typeof blog === "string") return contentNegotiation.sendErrorResponse(404,blog,req,res)
    return contentNegotiation.sendResponse(200,blog,req,res)
  }
  catch (error) {
    return contentNegotiation.sendErrorResponse(404,error.message,req,res) 
  }
};


exports.createBlog = async (req, res) => {
  try {
    const newBlog = await blogService.createBlog(req);
    return contentNegotiation.sendResponse(201,newBlog,req,res)
  } catch (error) {
    return contentNegotiation.sendErrorResponse(404,"Blog Creation Unsuccessful",req,res) 
  }
};

exports.updateBlog = async (req, res) => {
  try {
    let blog = await blogService.getBlog(req);
    if (typeof blog === "string") return contentNegotiation.sendErrorResponse(404,blog,req,res)
    if (blog.username !== req.body.username) return contentNegotiation.sendErrorResponse(403,"Not Have permission to Update",req,res)
    blog = await blogService.updateBlog(req);
    return contentNegotiation.sendResponse(200,blog,req,res)
  } catch (error) {
        return contentNegotiation.sendErrorResponse(404,error.message,req,res)
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await blogService.getBlog(req);
    if (typeof blog === "string") return contentNegotiation.sendErrorResponse(404,blog,req,res)
    if (blog.username !== req.body.username) return contentNegotiation.sendErrorResponse(403, "Not Have permission to delete",req,res)
    await blogService.deleteBlog(req);
    return contentNegotiation.sendResponse(200,"Blog Deleted",req,res)
  } catch (error) {
    return contentNegotiation.sendErrorResponse(404,error.message,req,res)
  }

};

