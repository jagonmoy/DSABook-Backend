const {promisify} = require('util')
const response = require("../utils/response/authResponse")
const jwt = require('jsonwebtoken')
const {UserService} = require("../service/userService")
const {MongoUserDao} = require("../dao/user/mongoUserDao")

const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

exports.protect = async(req, res,next) => {
    try {
      let token ;
      if (typeof req.headers.authorization === "undefined") {
        return response.errorAuthResponse(401,"You are not logged in",res);
      }
      else token = req.headers.authorization;

      let decoded;
      try {
        decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);    
      }
      catch(error) {
        next();
      }
      
      const legitUser = await userService.getUser(decoded.username);
      if(typeof legitUser.username === "undefined") return response.errorAuthResponse(401,"Token Belongs To the User Does not Exits",res);
  
      req.body.username = decoded.username;
  
      next();
    } 
    catch (error) {
      response.errorAuthResponse(404,error.message,res);
    }
};