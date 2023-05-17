const mongoUser = require("../../models/userModel");
const {AuthDao} = require ("../auth/authDao");
const {UserDto} = require("../../dto/userDto");
const {generateRefreshToken} = require("../../utils/JWTToken")

class MongoAuthDao extends AuthDao {
    async signupUser(req) {
        const {email,username} = req.body;
        let newUser = await mongoUser.findOne({email});
        if (newUser) return "Email is not unique";
        newUser = await mongoUser.findOne({username});
        if (newUser) return "Username is not unique";
        newUser = await mongoUser.create(req.body);
        return new UserDto(newUser);
    }
    async signinUser(req) {
        const {username,password} = req.body;
        let user = await mongoUser.findOne({username}).select('password');
        if (!user) return "Invalid Username or Password" ;
        if (!await user.matchPasswords(password,user.password)) return "Invalid Username or Password";
        user = await mongoUser.findById(user._id);
        return new UserDto(user);
    }
}

module.exports = {MongoAuthDao};