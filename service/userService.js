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
        console.log("service class er vitor dhuklam")
        return this.userDao.signinUser(req);
    }
  
  }
  
  module.exports = {UserService}
