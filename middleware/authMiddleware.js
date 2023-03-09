const {promisify} = require('util')
const contentNegotiation = require("../utils/contentNegotiation")
const jwt = require('jsonwebtoken')

exports.isSignedOut = async(req,res,next) => {
    try {
        console.log(req.headers);
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log("hi " ,token);
        if (token == null || token === undefined) next() ;
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err) => {
            if(!err) return contentNegotiation.sendErrorResponse(403,"Sign Out First And Then Try Again!",req,res,null);
            next();
        })
    } 
    catch (error) {
        return contentNegotiation.sendErrorResponse(404,error.message,req,res,null);
    }
};
exports.isSignedin = async(req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return contentNegotiation.sendErrorResponse(403,"Sign in First And Then Try Again!",req,res,null);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err) => {
          if(err) return contentNegotiation.sendErrorResponse(403,"Sign in First And Then Try Again!",req,res,null);
          next();
        })
    } 
    catch (error) {
        return contentNegotiation.sendErrorResponse(404,error.message,req,res,null);
    }
};
exports.refreshTokenCheck = async(req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return contentNegotiation.sendErrorResponse(403,"Refresh token not present in header",req,res,null);
        jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,decoded) => {
          if(err) return contentNegotiation.sendErrorResponse(403,"Refresh token not present in header",req,res,null);
          req.username = decoded.username;
          console.log(req.username)
          next();
        })
    } 
    catch (error) {
        return contentNegotiation.sendErrorResponse(404,error.message,req,res,null);
    }
};