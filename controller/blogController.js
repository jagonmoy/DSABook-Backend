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
      if (typeof blogs === "string") return contentNegotiation.sendBlogResponse(404,blogs,req,res)
      else return contentNegotiation.sendBlogResponse(200,blogs,req,res)
  } 
  catch (error) { 
    contentNegotiation.sendBlogResponse(404,error.message,req,res)    
  }
};


exports.getBlog = async (req, res) => {
  try {
    const blog = await blogService.getBlog(req);
    if(typeof blog === "string") return contentNegotiation.sendBlogResponse(404,blog,req,res)
    else return contentNegotiation.sendBlogResponse(200,blog,req,res)
  }
  catch (error) {
    
    contentNegotiation.sendBlogResponse(404,error.message,req,res) 
  }
};


exports.createBlog = async (req, res) => {
  try {
    const newBlog = await blogService.createBlog(req);
    contentNegotiation.sendBlogResponse(201,newBlog,req,res)
  } catch (error) {
    contentNegotiation.sendBlogResponse(404,"Blog Creation Unsuccessful",req,res) 
  }
};

exports.updateBlog = async (req, res) => {
  try {
    let blog = await blogService.getBlog(req);
    if (typeof blog === "string") return contentNegotiation.sendBlogResponse(404,blog,req,res)
    if (blog.username !== req.body.username) return contentNegotiation.sendBlogResponse(403,"Not Have permission to Update",req,res)
    blog = await blogService.updateBlog(req);
    contentNegotiation.sendBlogResponse(403,blog,req,res)
  } catch (err) {
    contentNegotiation.sendBlogResponse(404,error.message,req,res)
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await blogService.getBlog(req);
    if (typeof blog === "string") return contentNegotiation.sendBlogResponse(404,blog,req,res)
    if (blog.username !== req.body.username) return contentNegotiation.sendBlogResponse(403, "Not Have permission to delete",req,res)
    await blogService.deleteBlog(req);
    contentNegotiation.sendBlogResponse(403,"Blog Deleted",req,res)
  } catch (err) {
    contentNegotiation.sendBlogResponse(404,error.message,req,res)
  }

};

