const  MongoBlog = require("../models/blog");
const {BlogDao} = require ("./blogDao");
const {APIFeatures} = require("../apiFeatures/features");
const {BlogDto} = require("../dto/blog");
const Features = new APIFeatures()

class MongoDao extends BlogDao {
    async getAllBlogs(req) {
        const queryObj = Features.filter(req); 
        let query = MongoBlog.find(queryObj);
        query = Features.sort(query,req);
        query = Features.limitingFields(query,req);
        query = Features.paginate(query,req);
        if (req.query.page) {
            const numberDocuments = await MongoBlog.countDocuments();
            console.log(numberDocuments);
            if ( skip >= numberDocuments) return null;
        }
        const mongoBlogs = await query;
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

module.exports = {MongoDao};