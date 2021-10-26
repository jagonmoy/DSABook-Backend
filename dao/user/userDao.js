class UserDao {
    constructor() {
        if (this.constructor === UserDao) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    async createUser(req) {}
    async getAllUsers(req){}
}

module.exports = {UserDao}