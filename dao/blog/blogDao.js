class BlogDao {
    constructor() {
        if (this.constructor === BlogDao) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    async getAllBlogs(req) {}
    async getBlog(req) {}
    async createBlog(req) {}
    async updateBlog(req) {}
    async deleteBlog(req) {}
}

module.exports = {BlogDao}