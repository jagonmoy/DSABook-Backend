const {promisify} = require('util')
const contentNegotiation = require("../utils/contentNegotiation")
const jwt = require('jsonwebtoken')
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")

const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

exports.protect = async (req,res,next) => {
    try {
      const authHeader = req.headers['authorization'];
      console.log("asdasd ",authHeader);
      const token = await (authHeader && authHeader.split(' ')[1]);
      if (!token) return contentNegotiation.sendErrorResponse(401,"Access token is null",req,res,null);
      else jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, async (err,decoded) =>  {
        if(err) {
          console.log('all done')
          return contentNegotiation.sendErrorResponse(401,"Access Token is not valid",req,res,null);
        }
        else {
          const legitUser = await userService.getUser(decoded.username);
          if(!legitUser.username) contentNegotiation.sendErrorResponse(401,"Token Belongs To the User Does not Exits",req,res,null);
          req.body.username = legitUser.username;
          
          next();
        }
      });
  
    } 
    catch (error) {
      contentNegotiation.sendErrorResponse(404,error.message,req,res,null);
    }
};