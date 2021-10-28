class AuthDao {
    constructor() {
        if (this.constructor === AuthDao) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    async signupUser(req){}
    async signinUser(req){}
}

module.exports = {AuthDao}