const  mongoUser = require("../../models/userModel");
const {UserDao} = require ("./userDao");
const {UserDto} = require("../../dto/userDto");


class MongoUserDao extends UserDao {
    
    async createUser(req) {
        const newUser = await mongoUser.create(req.body);
        return new UserDto(newUser);
    }
    async getAllUsers(req) {
        const mongoUsers= await mongoUser.find(req.body);
        if (!mongoUsers.length) return null ;
        let allUsers  = [] ;
        for ( let i = 0 ; i < mongoUsers.length; i++) {
            allUsers[i] = new UserDto(mongoUsers[i]);
        }
        return allUsers;   
    }
}

module.exports = {MongoUserDao};