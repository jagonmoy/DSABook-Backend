const contentNegotiation = require("../utils/contentNegotiation")
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")

const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

exports.getAllUsers = async (req, res) => {
 try {
   const users = await userService.getAllUsers(req);
   contentNegotiation.sendUserResponse(200,users,req,res);
 } catch (error) {
  contentNegotiation.sendUserResponse(404,error.message,req,res);
 }
};
exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.username);
    if(typeof user === "string") return  contentNegotiation.sendUserResponse(404,user,req,res);
    contentNegotiation.sendUserResponse(200,user,req,res);
 } catch (error) {
    contentNegotiation.sendUserResponse(400,error.message,req,res);
 }
 };