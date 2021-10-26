class UserService {
    constructor(userDao) {
      this.userDao = userDao;
    }
    getAllUsers(req) {return this.userDao.getAllUsers(req);}
    getUser(req){return this.userDao.getUser(req);}
    createUser(req){return this.userDao.createUser(req);}
    updateUser(req){
      return this.userDao.updateUser(req);
    }
    deleteUser(req){return this.userDao.deleteUser(req);}  
  }
  
  module.exports = {UserService}
  