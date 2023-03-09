const contentNegotiation = require("../utils/contentNegotiation")
const jwt = require('jsonwebtoken')

exports.checkStatus = async(req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
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
        const token = req.body.refreshToken;
        if(!token) return contentNegotiation.sendErrorResponse(400,"Refresh token is not present",req,res,null);
        else jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,decoded) => {
          if(err) return contentNegotiation.sendErrorResponse(401,"Refresh token is not valid",req,res,null);
          
          req.username = decoded.username;
          console.log(req.username)
          next();
        })
    } 
    catch (error) {
        return contentNegotiation.sendErrorResponse(500,error.message,req,res,null);
    }
};