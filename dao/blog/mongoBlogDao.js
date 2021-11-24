const  MongoBlog = require("../../models/blogModel");
const {BlogDao} = require ("./blogDao");
const {mongoAPIFeatures} = require("../../utils/apiFeatures/mongoBlogFeatures");
const {BlogDto} = require("../../dto/blogDto");



class MongoBlogDao extends BlogDao {
    async getAllBlogs(req) {
        let query = mongoAPIFeatures.prototype.filter(req); 
        query = mongoAPIFeatures.prototype.sort(query,req);
        // query = mongoAPIFeatures.prototype.limitingFields(query,req);
        query = mongoAPIFeatures.prototype.paginate(query,req);
        const mongoBlogs = await query;
        if (!mongoBlogs.length) return "blogs doesnot exist";
        let allBlogs  = [] ;
        for ( let i = 0 ; i < mongoBlogs.length; i++) {
            allBlogs[i] = new BlogDto(mongoBlogs[i]);
        }
        return allBlogs;   
    }
    async getBlog(req) {
        let blog ; 
        try {
            blog = await MongoBlog.findById(req.params.id);
        } catch {
            return "blog doesnot exist";
        }
        return new BlogDto(blog) ;
    }
    async createBlog(req) {
        //console.log("dhukeche");
        const newBlog = await MongoBlog.create(req.body);
        return new BlogDto(newBlog);
    }
    async updateBlog(req) {
        const blog = await MongoBlog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return new BlogDto(blog);
    }
    async deleteBlog(req){
        return await MongoBlog.findByIdAndDelete(req.params.id);
    }
}

module.exports = {MongoBlogDao};