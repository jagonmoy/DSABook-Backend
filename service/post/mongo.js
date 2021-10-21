const MongoPost = require("../../models/post");
const {General} = require("./general");

const Mongo = class extends General {
    async findAllPosts(req) {
        console.log('kemon dilam');
        const queryObj = {...req.query};
        let query = MongoPost.find(queryObj);
        console.log("hello ki obostha")
        const allPosts = await query;
        return allPosts;
    }
    async findPost(req) {
         const post = await MongoPost.findById(req.params.id);
         return post ;
    }
    async createPost(req) {
         console.log('trying to create a post');
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