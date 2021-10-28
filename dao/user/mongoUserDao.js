const  mongoUser = require("../../models/userModel");
const {UserDao} = require ("./userDao");
const {UserDto} = require("../../dto/userDto");


class MongoUserDao extends UserDao {
    async getAllUsers(req) {
        const mongoUsers= await mongoUser.find(req.body);
        if (!mongoUsers.length) return null ;
        let allUsers  = [] ;
        for ( let i = 0 ; i < mongoUsers.length; i++) {
            allUsers[i] = new UserDto(mongoUsers[i]);
        }
        return allUsers;   
    }
    async getUser(username) {
        const user = await mongoUser.findOne({username});
        if (!user) return null ;
        return new UserDto(user) ;
    }
}

module.exports = {MongoUserDao};