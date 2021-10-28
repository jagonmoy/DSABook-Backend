const {promisify} = require('util')
const response = require("../utils/authResponse")
const {UserService} = require("../service/userService")
const {BlogService} = require("../service/blogService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")
const {MongoBlogDao} = require("../dao/blog/mongoBlogDao")
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const express = require("express"),
 negotiate = require("express-negotiate");
 dotenv.config({path : './config.env'})
const mongoBlogDatabase = new MongoUserDao();
 // const currentDatabase = new MysqlDao();
const userService = new UserService(mongoBlogDatabase);
const mongoUserDatabase = new MongoBlogDao();
// const currentDatabase = new MysqlDao();
const blogService = new BlogService(mongoUserDatabase);

const signinToken = (username) => {
  return jwt.sign({username : username},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
  })
}

exports.signup = async (req, res) => {
 try {
   const newUser = await userService.createUser(req);
   if(!newUser) throw new Error('Email or Username Already Exists');
   const token = signinToken(newUser.username);
   req.negotiate({
    "application/json": function () {  response.JSONAuthReponse(200,newUser,token,"Account is Created Successfully!",res)},
    "application/xml" :  function () { response.XMLAuthResponse(200,newUser,token,"Account is Created Successfully!",res)},
    "application/default": function() { response.defaultAuthResponse(200,newUser,token,"Account is Created Successfully!",res)}
 });
 } catch (error) {
     response.errorAuthResponse(403,error.message,res);
 }
};
exports.signin = async (req, res) => {
  try {
    const user = await userService.signinUser(req);
    if (!user) throw new Error('Incorrect Email or Password');
    const token = signinToken(user.username);
    req.negotiate({
     "application/json": function () {  response.JSONAuthReponse(200,user,token,"Signed in Successfully!",res)},
     "application/xml" :  function () { response.XMLAuthResponse(200,user,token,"Signed in Successfully!",res)},
     "application/default": function() { response.defaultAuthResponse(200,user,token,"Signed in Successfully!",res)}
  });
  } catch (error) {
      response.errorAuthResponse(401,error.message,res);
  }
 };
 exports.protect = async(req, res,next) => {
  try {
    let token ;
    if (req.headers.authorization) token = req.headers.authorization;
    if (token == undefined) return response.errorAuthResponse(401,"You are not logged in");
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);    
    }
    catch(error) {
      return response.errorAuthResponse(401,"Invalid Token,Token Expiry is Over or It Does not Exist",res);
    }
    
    /*
    const legitUser = await userService.getUser(decoded.username);
    if(!legitUser) return response.errorAuthResponse(401,"Token Belongs To the User Does not Exits",res);
    if(await userService.changePasswordAfter(decoded.username,decoded.iat)) response.errorAuthResponse(401,"Password was Changed , Login Again",res);
    */

    req.body.username = decoded.username;
    next();
  } catch (error) {
      response.errorAuthResponse(404,error.message,res);
  }
 };
 exports.restrictTo = () => { 
   return async (req,res,next) => {
     const blog = await blogService.getBlog(req);
     if (!blog) return response.errorAuthResponse(404,"Blog Does not Exist",res);
     if (blog.username !== req.body.username) return response.errorAuthResponse(403,"Not Have permission to delete or update",res);
     next();
   }
 }

