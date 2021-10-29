class AuthDao {
    constructor() {
        if (this.constructor === AuthDao) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    async signupUser(){}
    async signinUser(){}
}

module.exports = {AuthDao}