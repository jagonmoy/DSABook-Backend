const MongoPost = require("../../models/post");
const {General} = require("./general");
const {APIFeatures} = require("../../apiFeatures/Features");
const Features = new APIFeatures()

const Mongo = class extends General {
    async findAllPosts(req) {
          const queryObj = Features.filter(req); 
          let query = MongoPost.find(queryObj);
          query = Features.sort(query,req);
          query = Features.limitingFields(query,req);
          query = Features.paginate(query,req);
          if (req.query.page) {
              const numberDocuments = await MongoPost.countDocuments();
              console.log(numberDocuments);
              if ( skip >= numberDocuments) return null;
          }
          const allPosts = await query;
          return allPosts;   
    }
    async findPost(req) {
         const post = await MongoPost.findById(req.params.id);
         return post ;
    }
    async createPost(req) {
         const newPost = await MongoPost.create(req.body);
         return newPost;
    }
    async updatePost(req) {
      const post = await MongoPost.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return post ;
    }
    async deletePost(req){
      await MongoPost.findByIdAndDelete(req.params.id);
    }
 }

 module.exports = {Mongo}