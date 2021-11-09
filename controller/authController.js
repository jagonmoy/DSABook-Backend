const contentNegotiation = require("../utils/contentNegotiation")
const {AuthService} = require("../service/authService")
const {MongoAuthDao} = require("../dao/auth/mongoAuthDao")
const  sendJWTToken = require("../utils/sendJWTToken")
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})

const mongoAuthDao = new MongoAuthDao();
const authService = new AuthService(mongoAuthDao);

exports.authService = authService ;

exports.signup = async (req, res) => {
 try {
   const newUser = await authService.signupUser(req);
   if(typeof newUser === "string") return contentNegotiation.sendAuthResponse(403,newUser,req,res,null);
   else return contentNegotiation.sendAuthResponse(200,newUser,req,res,null);
 } 
 catch (error) {
   return contentNegotiation.sendAuthResponse(403,error.message,req,res,null);
 }
};

exports.signin = async (req, res) => {
  try {
    const user = await authService.signinUser(req);
    if (typeof user === "string") return contentNegotiation.sendAuthResponse(401,user,req,res,null);
    const {cookieOptions,token} = sendJWTToken.sendToken(user.username); 
    res.cookie("jwt",cookieOptions,token);
    return contentNegotiation.sendAuthResponse(200,"Signed in Successfully",req,res,token);
  } catch (error) {
    return contentNegotiation.sendAuthResponse(401,error.message,req,res,null);
  }
 };
 exports.signout = async (req, res) => {
    return contentNegotiation.sendAuthResponse(200,"Signed Out Successfully!",req,res,null);
 };
 
