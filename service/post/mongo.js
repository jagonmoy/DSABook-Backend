const MongoPost = require("../../models/post");
const {General} = require("./general");

const Mongo = class extends General {
    async findAllPosts(req) {
        const queryObj = {...req.query};
        let query = MongoPost.find(queryObj);
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