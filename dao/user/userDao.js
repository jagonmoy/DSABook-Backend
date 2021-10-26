class UserDao {
    constructor() {
        if (this.constructor === UserDao) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    async getAllUsers(req) {}
    async getUser(req) {}
    async createUser(req) {}
    async updateUser(req) {}
    async deleteUser(req) {}
}

module.exports = {UserDao}