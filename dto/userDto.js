class UserDto {
    constructor(user) {
        console.log(user);
        const userDto = JSON.parse(JSON.stringify(user));
        this.userName = userDto.userName;
        this.email = userDto.email;
        this.password = userDto.password;
        this.confirmPassword = userDto.confirmPassword
        this.createdAt = userDto.createdAt;
        this.id = userDto._id;
    }
}

module.exports = {UserDto}