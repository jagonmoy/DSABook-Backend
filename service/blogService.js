class BlogService {
    constructor(blogDao) {
      this.blogDao = blogDao;
    }
    getAllBlogs(req) {return this.blogDao.getAllBlogs(req);}
    getBlog(req){ return this.blogDao.getBlog(req);}
    createBlog(req){
      console.log('service er vitor')
      return this.blogDao.createBlog(req);
    }
    updateBlog(req){return this.blogDao.updateBlog(req);}
    deleteBlog(req){return this.blogDao.deleteBlog(req);}  
  }
  
  module.exports = {BlogService}
  