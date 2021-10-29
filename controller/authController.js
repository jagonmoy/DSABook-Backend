const {promisify} = require('util')
const response = require("../utils/authResponse")
const {UserService} = require("../service/userService")
const {BlogService} = require("../service/blogService")
const {AuthService} = require("../service/authService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")
const {MongoBlogDao} = require("../dao/blog/mongoBlogDao")
const {MongoAuthDao} = require("../dao/auth/mongoAuthDao")
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const express = require("express"),
 negotiate = require("express-negotiate");
 dotenv.config({path : './config.env'})
const mongoBlogDao = new MongoBlogDao();
const blogService = new BlogService(mongoBlogDao);

const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

const mongoAuthDao = new MongoAuthDao();
const authService = new AuthService(mongoAuthDao);

const signinToken = (username) => {
  return jwt.sign({username : username},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
  })
}

exports.signup = async (req, res) => {
 try {
   const newUser = await authService.signupUser(req);
   if(!newUser) return response.errorAuthResponse(403,'Email or Username Already Exists',res);

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
    const user = await authService.signinUser(req);
    if (!user) return response.errorAuthResponse(401,'Incorrect Email or Password',res);

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
    if (typeof req.headers.authorization === "undefined") {
      return response.errorAuthResponse(401,"You are not logged in",res);
    }
    token = req.headers.authorization;
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);    
    }
    catch(error) {
      return response.errorAuthResponse(401,"Invalid Token,Token Expiry is Over or It Does not Exist",res);
    }

    const legitUser = await userService.getUser(decoded.username);
    if(typeof legitUser.username === "undefined") return response.errorAuthResponse(401,"Token Belongs To the User Does not Exits",res);

    req.body.username = decoded.username;

    next();
  } catch (error) {
      response.errorAuthResponse(404,error.message,res);
  }
 };

