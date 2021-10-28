class UserService {
    constructor(userDao) {
      this.userDao = userDao;
    }
    async createUser(req){
        return this.userDao.createUser(req);
    }
    async getAllUsers(req) {
        return this.userDao.getAllUsers(req);
    }
    async signinUser(req){
        return this.userDao.signinUser(req);
    }
    async getUser(username) {
        return this.userDao.getUser(username)
    }
    /*
    async changePasswordAfter(username,time) {
        return await this.userDao.changePasswordAfter(username,time);
    }
    */
  }
  
  module.exports = {UserService}