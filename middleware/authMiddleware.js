const {promisify} = require('util')
const contentNegotiation = require("../utils/contentNegotiation")
const jwt = require('jsonwebtoken')

exports.isSignedIn = async(req, res,next) => {
    try {
      const token = req.cookies.jwt;
      console.log(token)
      if (typeof req.cookies.jwt === "undefined" || req.cookies.jwt === '') {
        console.log("hello")
        next()
      }
      else {
      const decoder = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
      console.log(decoder);
      if (decoder.username !== "undefined") return contentNegotiation.sendResponse(403,"Sign Out First And Then Try Again!",req,res,null);
      next()
      }
    } 
    catch (error) {
      contentNegotiation.sendResponse(404,error.message,req,res,null);
    }
};
exports.notSignedIn = async(req, res,next) => {
    try {
        try { 
            const token = req.cookies.jwt;
            const decoder = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
            if (decoder.username === "undefined") return contentNegotiation.sendResponse(403,"Sign in First And Then Try Again!",req,res,null);
            next()
        } catch {
            return response.errorAuthResponse(404,"Sign in First And Then Try Again!",res);
        }
    } 
    catch (error) {
      contentNegotiation.sendResponse(404,error.message,req,res,null);
    }
};