const mongoUser = require("../../models/userModel");
const {AuthDao} = require ("../auth/authDao");
const {UserDto} = require("../../dto/userDto");


class MongoAuthDao extends AuthDao {
    async signupUser(req) {
        const {email,username} = req.body;
        let newUserEmail = await mongoUser.findOne({email});
        if (newUserEmail) return null;
        let newUserUsername = await mongoUser.findOne({username});
        if (newUserUsername) return null;
        newUserUsername = await mongoUser.create(req.body);
        return new UserDto(newUserUsername);
    }
    async signinUser(req) {
        const {email,password} = req.body;
        const user = await mongoUser.findOne({email}).select('password');
        if (!user) return null ;
        if (!await user.matchPasswords(password,user.password)) return null ;
        return new UserDto(user);
    }
}

module.exports = {MongoAuthDao};