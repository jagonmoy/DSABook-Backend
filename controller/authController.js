const response = require("../utils/response")
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")
const express = require("express"),
 negotiate = require("express-negotiate");

const currentDatabase = new MongoUserDao();
 // const currentDatabase = new MysqlDao();
const userService = new UserService(currentDatabase);

exports.signup = async (req, res) => {
 try {
   const newUser = await userService.createUser(req);
   req.negotiate({
       "application/json": function () { response.JSONReponse(200,newUser,res)},
       "application/xml" :  function () { response.XMLResponse(200,newUser,res)},
       "application/default": function() { response.defaultResponse(200,newUser,res)}
   });
 } catch (err) {
     response.errorResponse(404,res);
 }
};
