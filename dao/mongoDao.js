const  MongoBlog = require("../models/blog");
const {BlogDao} = require ("./blogDao");
const {APIFeatures} = require("../apiFeatures/features");
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
        const allBlogs = await query;
        return allBlogs;   
    }
    async getBlog(req) {
        const blog = await MongoBlog.findById(req.params.id);
        return blog ;
    }
    async createBlog(req) {
        const newBlog = await MongoBlog.create(req.body);
        return newBlog;
    }
    async updateBlog(req) {
        const blog = await MongoBlog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return blog ;
    }
    async deleteBlog(req){
        await MongoBlog.findByIdAndDelete(req.params.id);
    }
}

module.exports = {MongoDao};