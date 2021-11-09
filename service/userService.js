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
    async getUser(id) {
        return this.userDao.getUser(id)
    }
    async changePasswordAfter(id,time) {
        return await this.userDao.changePasswordAfter(id,time);
    }
  
  }
  
  module.exports = {UserService}