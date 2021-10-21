const General = class {
    constructor() {
      if (this.constructor == General) {
        throw new Error("Abstract classes can't be instantiated.");
      }
    }
    async findAllPosts(req) {
      throw new Error("Method must be implemented.");
    }
    async findPost(req) {
      throw new Error("Method must be implemented.");
    }
    async createPost(req) {
      throw new Error("Method must be implemented.");
    }
    async updatePost(req) {
      throw new Error("Method must be implemented.");
    }
    async deletePost(req) {
      throw new Error("Method must be implemented.");
    }
 }

 module.exports = {General};