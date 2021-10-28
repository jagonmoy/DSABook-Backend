const  mongoUser = require("../../models/userModel");
const {UserDao} = require ("./userDao");
const {UserDto} = require("../../dto/userDto");


class MongoUserDao extends UserDao {
    async createUser(req) {
        const {email,username} = req.body;
        let newUserEmail = await mongoUser.findOne({email});
        if (newUserEmail) return null;
        let newUserUsername = await mongoUser.findOne({username});
        if (newUserUsername) return null;
        newUserUsername = await mongoUser.create(req.body);
        return new UserDto(newUserUsername);
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
    async getUser(username) {
        const user = await mongoUser.findOne({username});
        if (!user) return null ;
        return new UserDto(user) ;
    }
    async signinUser(req) {
        const {email,password} = req.body;
        const user = await mongoUser.findOne({email}).select('password');
        if (!user) return null ;
        if (!await user.matchPasswords(password,user.password)) return null ;
        return new UserDto(user);
    }
    async changePasswordAfter(username,JWTTimeStamp) {
       const user = await mongoUser.findOne({username});
       return await user.changePasswordAfter(JWTTimeStamp)
    }
    
}

module.exports = {MongoUserDao};