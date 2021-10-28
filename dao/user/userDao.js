class UserDao {
    constructor() {
        if (this.constructor === UserDao) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    async getAllUsers(req){}
    async getUser(id){}
}

module.exports = {UserDao}