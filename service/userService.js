class UserService {
    constructor(userDao) {
      this.userDao = userDao;
    }
    createUser(req){
        return this.userDao.createUser(req);
    }
    getAllUsers(req) {
        return this.userDao.getAllUsers(req);
    }
    signinUser(req){
        return this.userDao.signinUser(req);
    }
  
  }
  
  module.exports = {UserService}