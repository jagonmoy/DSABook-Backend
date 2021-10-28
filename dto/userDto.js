
class UserDto {
    constructor(user) {
        const userDto = JSON.parse(JSON.stringify(user));
        this.name = userDto.name;
        this.username = userDto.username;
        this.email = userDto.email;
        this.password = userDto.password;
        this.confirmPassword = userDto.confirmPassword
        this.createdAt = userDto.createdAt;
        this.id = userDto._id;
        //this.lastPasswordChangedAt = userDto.passwordChangedAt;
        this.role = userDto.role;
    }
}

module.exports = {UserDto}