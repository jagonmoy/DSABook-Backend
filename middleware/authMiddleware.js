const contentNegotiation = require("../utils/contentNegotiation")
const jwt = require('jsonwebtoken')
const MongoUser = require("../models/userModel");

exports.checkStatus = async(req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        // console.log(authHeader);
        const token = await (authHeader && authHeader.split(' ')[1]);
        if (!token) next() ;
        else jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err) => {
            if(err) next() ;
            else return contentNegotiation.sendErrorResponse(403,"Please, Sign Out first and then try again!",req,res,null);
        })
    } 
    catch (error) {
        return contentNegotiation.sendErrorResponse(500,error.message,req,res,null);
    }
};
exports.refreshTokenCheck = async(req,res,next) => {
    try {
        console.log('asdasdasd');
        const {refreshToken: token} = req.body.refreshToken;
        console.log(token);
        if(!token) return contentNegotiation.sendErrorResponse(400,"Refresh token is not present",req,res,null);
        else jwt.verify(token,process.env.REFRESH_TOKEN_SECRET, async (err,decoded) => {
          if(err) return contentNegotiation.sendErrorResponse(401,"Refresh token is not valid",req,res,null);
          req.username = decoded.username;
          const user = await MongoUser.findOne({ username: req.username });
          const refreshTokenExists = user.tokens.includes(token);
          if(!refreshTokenExists) return contentNegotiation.sendErrorResponse(404,"Refresh token Does not Exist!",req,res,null);
          else next();
        })
    } 
    catch (error) {
        return contentNegotiation.sendErrorResponse(500,error.message,req,res,null);
    }
};