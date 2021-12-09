const  mongoUser = require("../../models/userModel");
const {UserDao} = require ("./userDao");
const {UserDto} = require("../../dto/userDto");


class MongoUserDao extends UserDao {
  async getAllUsers(req) {
    const mongoUsers = await mongoUser.find(req.body);
    console.log(mongoUsers);
    if (!mongoUsers.length) return "users Do not Exist";
    let allUsers = [];
    for (let i = 0; i < mongoUsers.length; i++) {
      allUsers[i] = new UserDto(mongoUsers[i]);
    }
    console.log(allUsers)
    return allUsers;
  }
  async getUser(username) {
    let user = await mongoUser.findOne({ username });
    if (!user) return "This Username doesnot exist";
    return new UserDto(user);
  }
}
module.exports = {MongoUserDao};