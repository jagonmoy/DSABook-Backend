const jwt = require('jsonwebtoken')
const response = require("../utils/authResponse")
const {AuthService} = require("../service/authService")
const {MongoAuthDao} = require("../dao/auth/mongoAuthDao")
const dotenv = require('dotenv');
const express = require("express"),
 negotiate = require("express-negotiate");
 dotenv.config({path : './config.env'})

const mongoAuthDao = new MongoAuthDao();
const authService = new AuthService(mongoAuthDao);

const sendToken = (username) => {
  const token =  jwt.sign({username : username},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
  })
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000  
    ),
    //secure: true
    httpOnly: true
  };
  return {cookieOptions,token};
}

exports.signup = async (req, res) => {
 try {
   const newUser = await authService.signupUser(req);
   if(typeof newUser === "string") return response.errorAuthResponse(403,newuser,res);
  
   req.negotiate({
    "application/json": function () {  response.JSONAuthReponse(200,newUser,null,"Account is Created Successfully!",res)},
    "application/xml" :  function () { response.XMLAuthResponse(200,newUser,null,"Account is Created Successfully!",res)},
    "application/default": function() { response.defaultAuthResponse(200,newUser,null,"Account is Created Successfully!",res)}
 });
 } catch (error) {
     response.errorAuthResponse(403,error.message,res);
 }
};
exports.signin = async (req, res) => {
  try {
    const user = await authService.signinUser(req);
    if (typeof user === "string") return response.errorAuthResponse(401,user,res);

    const {cookieOptions,token} = sendToken(user.username); 
    
    res.cookie("jwt",cookieOptions,token);
     
    req.negotiate({
     "application/json": function () {  response.JSONAuthReponse(200,user,token,"Signed in Successfully!",res)},
     "application/xml" :  function () { response.XMLAuthResponse(200,user,token,"Signed in Successfully!",res)},
     "application/default": function() { response.defaultAuthResponse(200,user,token,"Signed in Successfully!",res)}
  });
  } catch (error) {
      response.errorAuthResponse(401,error.message,res);
  }
 };
 exports.signout = async (req, res) => {
  try {
    const user = "user Logged Out" ;
    const token = req.header.authorization;
    req.negotiate({
     "application/json": function () {  response.JSONAuthReponse(200,null,token,"Signed Out Successfully!",res)},
     "application/xml" :  function () { response.XMLAuthResponse(200,null,token,"Signed Out Successfully!",res)},
     "application/default": function() { response.defaultAuthResponse(200,null,token,"Signed Out Successfully!",res)}
  });
  } catch (error) {
      response.errorAuthResponse(401,error.message,res);
  }
 };
 
