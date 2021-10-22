const General = class {
    constructor() {
      if (this.constructor == General) {
        throw new Error("Abstract classes can't be instantiated.");
      }
    }
    async findAllBlogs(req) {}
    async findBlog(req) {}
    async createBlog(req) {}
    async updateBlog(req) {}
    async deleteBlog(req) {}
 }

 module.exports = {General};