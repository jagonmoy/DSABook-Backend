class BlogService {
    constructor(blogDao) {
      this.blogDao = blogDao;
    }
    async getAllBlogs(req) {return this.blogDao.getAllBlogs(req);}
    async getBlog(req){ return this.blogDao.getBlog(req);}
    async createBlog(req){
      return await this.blogDao.createBlog(req);
    }
    async updateBlog(req){return this.blogDao.updateBlog(req);}
    async deleteBlog(req){return this.blogDao.deleteBlog(req);}  
  }
  
  module.exports = {BlogService}
  