const response = require("../utils/authResponse")
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const express = require("express"),
 negotiate = require("express-negotiate");
 dotenv.config({path : './config.env'})
const currentDatabase = new MongoUserDao();
 // const currentDatabase = new MysqlDao();
const userService = new UserService(currentDatabase);

const signinToken = (id) => {
  return jwt.sign({id : id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
  })
}

exports.signup = async (req, res) => {
 try {
   const newUser = await userService.createUser(req);
   if(!newUser) throw new Error('Email Already Exists');
   const token = signinToken(newUser.id);
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
    const token = signinToken(user.id);
    req.negotiate({
     "application/json": function () {  response.JSONAuthReponse(200,user,token,"Signed in Successfully!",res)},
     "application/xml" :  function () { response.XMLAuthResponse(200,user,token,"Signed in Successfully!",res)},
     "application/default": function() { response.defaultAuthResponse(200,user,token,"Signed in Successfully!",res)}
  });
  } catch (error) {
      response.errorAuthResponse(404,error.message,res);
  }
 };

