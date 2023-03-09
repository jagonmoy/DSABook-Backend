const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({path : '../config.env'})
const MongoUser = require("../models/userModel");

exports.generateAccessToken = (username) => {
    const accessToken = jwt.sign({username : username},process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    });
    return accessToken;
}   
exports.generateRefreshToken = async (username) => {
  const refreshToken = jwt.sign({username : username},process.env.REFRESH_TOKEN_SECRET);
  const user = await MongoUser.findOne({username});
  user.refreshTokens.push(refreshToken);
  user.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
        console.log(result)
    }
  })
  return refreshToken;
} 

exports.clearSingleToken = async (refreshToken,username) => {
    const user = await MongoUser.findOneAndUpdate(
      { username: username },
      { $pull: { refreshTokens: refreshToken } },
      { new: true }
    );
    user.save(function(err,result){
      if (err){
          console.log(err);
      }
      else{
          console.log(result)
      }
    })
}
  