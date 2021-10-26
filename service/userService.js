class UserService {
    constructor(userDao) {
      this.userDao = userDao;
    }
    createUser(req){
        return this.userDao.createUser(req);
    }
  
  }
  
  module.exports = {UserService}
  