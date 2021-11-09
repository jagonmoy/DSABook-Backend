const response = require("../utils/userResponse")
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")
const express = require("express"),
 negotiate = require("express-negotiate");

const currentDatabase = new MongoUserDao();
 // const currentDatabase = new MysqlDao();
const userService = new UserService(currentDatabase);

exports.getAllUsers = async (req, res) => {
 try {
   const users = await userService.getAllUsers(req);
   req.negotiate({
       "application/json": function () { response.JSONUserReponse(200,users,res)},
       "application/xml" :  function () { response.XMLUserResponse(200,users,res)},
       "application/default": function() { response.defaultUserResponse(200,users,res)}
   });
 } catch (err) {
     response.errorUserResponse(404,res);
 }
};