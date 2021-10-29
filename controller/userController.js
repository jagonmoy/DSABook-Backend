const response = require("../utils/response/userResponse")
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")
const express = require("express"),
 negotiate = require("express-negotiate");

const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

exports.getAllUsers = async (req, res) => {
 try {
   const users = await userService.getAllUsers(req);
   req.negotiate({
       "application/json": function () { response.JSONUserResponse(200,users,res)},
       "application/xml" :  function () { response.XMLUserResponse(200,users,res)},
       "application/default": function() { response.defaultUserResponse(200,users,res)}
   });
 } catch (err) {
     response.errorUserResponse(404,res);
 }
};
exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.username);
    if(!user) return response.errorUserResponse(404,"This user does not Exist",res)
    req.negotiate({
     "application/json": function ()  { response.JSONUserResponse(200,user,res)},
     "application/xml" :  function () { response.XNLUserResponse(200,user,res)},
     "application/default": function(){ response.defaultUserReponse(200,user,res)}
  });
 } catch (error) {
   response.errorUserResponse(404,error.message,res);
 }
 };