const  mongoUser = require("../../models/userModel");
const {UserDao} = require ("./userDao");
const {UserDto} = require("../../dto/userDto");


class MongoUserDao extends UserDao {
    
    async createUser(req) {

        const newUser = await mongoUser.create(req.body);
        return new UserDto(newUser);
    }
}

module.exports = {MongoUserDao};