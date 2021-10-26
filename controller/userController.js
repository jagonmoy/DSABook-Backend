const response = require("../utils/response")
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
       "application/json": function () { response.JSONReponse(200,users,res)},
       "application/xml" :  function () { response.XMLResponse(200,users,res)},
       "application/default": function() { response.defaultResponse(200,users,res)}
   });
 } catch (err) {
     response.errorResponse(404,res);
 }
};
