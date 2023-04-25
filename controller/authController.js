const contentNegotiation = require("../utils/contentNegotiation")
const {AuthService} = require("../service/authService")
const {MongoAuthDao} = require("../dao/auth/mongoAuthDao")
const JWTToken = require("../utils/JWTToken")
const dotenv = require('dotenv');
dotenv.config({path : '../config.env'})


const mongoAuthDao = new MongoAuthDao();
const authService = new AuthService(mongoAuthDao);

exports.authService = authService ;

exports.signup = async (req, res) => {
 try {
   const newUser = await authService.signupUser(req);
   if(typeof newUser === "string") return contentNegotiation.sendErrorResponse(403,newUser,req,res);
   else return contentNegotiation.sendResponse(201,null,req,res);
 } 
 catch (error) {
   return contentNegotiation.sendErrorResponse(403,error.message,req,res);
 }
};

exports.signin = async (req, res) => {
  try {
    const authServiceSignInResponse = await authService.signinUser(req);
    // console.log(req.body)
    let user;
    if (typeof authServiceSignInResponse === "string") {
      return contentNegotiation.sendErrorResponse(401,authServiceSignInResponse,req,res);
    }
    else user = authServiceSignInResponse;
    const accessToken = JWTToken.generateAccessToken(user.username);
    const refreshToken = await JWTToken.generateRefreshToken(user.username);
    

    return contentNegotiation.sendResponse(200,{accessToken : accessToken, refreshToken: refreshToken},req,res);
  } catch (error) {
    return contentNegotiation.sendErrorResponse(401,error.message,req,res);
  }
 };
 exports.signout = async (req, res) => {
  const refreshToken = req.body.refreshToken ; 
  JWTToken.clearSingleToken(refreshToken,req.username);
  return contentNegotiation.sendResponse(204,null,req,res);
 };

 exports.getNewAccessToken = async (req,res) => {
    const username = req.username ;
    const accessToken = JWTToken.generateAccessToken(username);
    return contentNegotiation.sendResponse(200,{accessToken : accessToken},req,res);
 }

 
