const General = class {
    constructor() {
      if (this.constructor == General) {
        throw new Error("Abstract classes can't be instantiated.");
      }
    }
    async findAllPosts(req) {}
    async findPost(req) {}
    async createPost(req) {}
    async updatePost(req) {}
    async deletePost(req) {}
 }

 module.exports = {General};