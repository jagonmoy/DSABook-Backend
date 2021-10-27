const  mongoUser = require("../../models/userModel");
const {UserDao} = require ("./userDao");
const {UserDto} = require("../../dto/userDto");


class MongoUserDao extends UserDao {
    async createUser(req) {
        const {email} = req.body;
        let newUser = await mongoUser.findOne({email});
        if (newUser) return null;
        newUser = await mongoUser.create(req.body);
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
    async signinUser(req) {
        const {email,password} = req.body;
        const user = await mongoUser.findOne({email}).select('password');
        if (!user) return null ;
        if (!await user.matchPasswords(password,user.password)) return null ;
        else console.log(user)
        return new UserDto(user);
    }
    
}

module.exports = {MongoUserDao};