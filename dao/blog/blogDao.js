class BlogDao {
    constructor() {
        if (this.constructor === BlogDao) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    async getAllBlogs() {}
    async getBlog() {}
    async createBlog() {}
    async updateBlog() {}
    async deleteBlog() {}
}

module.exports = {BlogDao}