const {promisify} = require('util')
const response = require("../utils/authResponse")
const jwt = require('jsonwebtoken')

exports.isSignedIn = async(req, res,next) => {
    try {
      try { 
          const token = req.headers.authorization;
          const decoder = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
          if (decoder.username !== "undefined") return response.errorAuthResponse(404,"Sign Out First And Then Try Again!",res);
          next()
      } catch {
         next();
      }
    } 
    catch (error) {
      response.errorAuthResponse(404,error.message,res);
    }
};
exports.notSignedIn = async(req, res,next) => {
    try {
        console.log("Checking")
        try { 
            const token = req.headers.authorization;
            const decoder = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
            if (decoder.username === "undefined") return response.errorAuthResponse(404,"Sign in First And Then Try Again!",res);
            next()
        } catch {
            return response.errorAuthResponse(404,"Sign in First And Then Try Again!",res);
        }
    } 
    catch (error) {
      response.errorAuthResponse(404,error.message,res);
    }
};