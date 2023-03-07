const contentNegotiation = require("../utils/contentNegotiation")
const {AuthService} = require("../service/authService")
const {MongoAuthDao} = require("../dao/auth/mongoAuthDao")
const  JWTToken = require("../utils/JWTToken")
const dotenv = require('dotenv');
dotenv.config({path : '../config.env'})


const mongoAuthDao = new MongoAuthDao();
const authService = new AuthService(mongoAuthDao);

exports.authService = authService ;

exports.signup = async (req, res) => {
 try {
   const newUser = await authService.signupUser(req);
   if(typeof newUser === "string") return contentNegotiation.sendErrorResponse(403,newUser,req,res);
   else return contentNegotiation.sendResponse(200,newUser,req,res);
 } 
 catch (error) {
   return contentNegotiation.sendErrorResponse(403,error.message,req,res);
 }
};

exports.signin = async (req, res) => {
  try {
    console.log("hey")
    const authServiceSignInResponse = await authService.signinUser(req);
    let user;
    if (typeof authServiceSignInResponse === "string") {
      console.log(authServiceSignInResponse);
      return contentNegotiation.sendErrorResponse(401,authServiceSignInResponse,req,res);
    }
    else user = authServiceSignInResponse;
    // const {token,cookieOptions} = JWTToken.sendJWTToken(user.username)
    const {accessToken,refreshToken} = JWTToken.generateTokens(user.username);

    res.headers.set('Authorization',`Bearer ${accessToken}`);
    return contentNegotiation.sendResponse(200,{accessToken : accessToken, refreshToken: refreshToken},req,res);
  } catch (error) {
    return contentNegotiation.sendErrorResponse(401,error.message,req,res);
  }
 };
 exports.signout = async (req, res) => {
      
  const cookieOptions  = JWTToken.clearToken();
  res.cookie("jwt",'',cookieOptions)
  return contentNegotiation.sendResponse(200,"Signed Out Successfully!",req,res);
 };
 
