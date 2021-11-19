const contentNegotiation = require("../utils/contentNegotiation")
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")

const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

exports.userService = userService ;

exports.getAllUsers = async (req, res) => {
 try {
   const users = await userService.getAllUsers(req);
   return contentNegotiation.sendResponse(200,users,req,res);
 } catch (error) {
  return contentNegotiation.sendResponse(404,error.message,req,res);
 }
};
exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.username);
    if(typeof user === "string") return contentNegotiation.sendResponse(404,user,req,res);
    return contentNegotiation.sendResponse(200,user,req,res);
 } catch (error) {
    return contentNegotiation.sendResponse(404,error.message,req,res);
 }
 };