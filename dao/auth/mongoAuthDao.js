const mongoUser = require("../../models/userModel");
const {AuthDao} = require ("../auth/authDao");
const {UserDto} = require("../../dto/userDto");
const {generateRefreshToken} = require("../../utils/JWTToken")

class MongoAuthDao extends AuthDao {
    async signupUser(req) {
        const {email,username} = req.body;
        let newUser = await mongoUser.findOne({email});
        if (newUser) return "Email is not Unique";
        newUser = await mongoUser.findOne({username});
        if (newUser) return "Username is not Unique";
        newUser = await mongoUser.create(req.body);
        return new UserDto(newUser);
    }
    async signinUser(req) {
        // console.log('service er vitor')
        const {username,password} = req.body;
        let user = await mongoUser.findOne({username}).select('password');
       
        if (!user) return "Incorrect Username" ;
        if (!await user.matchPasswords(password,user.password)) return "Password is not correct";
        user = await mongoUser.findById(user._id);
        return new UserDto(user);
    }
}

module.exports = {MongoAuthDao};