class UserDao {
    constructor() {
        if (this.constructor === UserDao) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    async getAllUsers(){}
    async getUser(){}
}

module.exports = {UserDao}