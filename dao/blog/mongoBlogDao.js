const  MongoBlog = require("../../models/blogModel");
const {BlogDao} = require ("./blogDao");
const {mongoAPIFeatures} = require("../../apiFeatures/mongoFeatures");
const {BlogDto} = require("../../dto/blogDto");
const mongoFeatures = new mongoAPIFeatures()

class MongoBlogDao extends BlogDao {
    async getAllBlogs(req) {
        let query = mongoFeatures.filter(req); 
        query = mongoFeatures.sort(query,req);
        query = mongoFeatures.limitingFields(query,req);
        query = mongoFeatures.paginate(query,req);
        const mongoBlogs = await query;
        if (!mongoBlogs.length) return null ;
        let allBlogs  = [] ;
        for ( let i = 0 ; i < mongoBlogs.length; i++) {
            allBlogs[i] = new BlogDto(mongoBlogs[i]);
        }
        return allBlogs;   
    }
    async getBlog(req) {
        const blog = await MongoBlog.findById(req.params.id);
        return new BlogDto(blog) ;
    }
    async createBlog(req) {
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
        await MongoBlog.findByIdAndDelete(req.params.id);
    }
}

module.exports = {MongoBlogDao};