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
  
  }
  
  module.exports = {UserService}
