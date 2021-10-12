const MongoPost = require("../models/post");
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})

const General = class {
    constructor() {
      if (this.constructor == General) {
        throw new Error("Abstract classes can't be instantiated.");
      }
    }
    async findAllPosts() {
      throw new Error("Method must be implemented.");
    }
    async findPost(req) {
      throw new Error("Method must be implemented.");
    }
    async createPost(req) {
      throw new Error("Method must be implemented.");
    }
    async updatePost(req) {
      throw new Error("Method must be implemented.");
    }
    async deletePost(req) {
      throw new Error("Method must be implemented.");
    }
 }

 const Mongo = class extends General {
    async findAllPosts() {
        const allPosts = await MongoPost.find();
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
 const SQL = class extends General {
    async findAllPosts() {
           
    } 
    async findPost(req) {

    }
    async createPost(req){

    }
    async updatePost(req){

    }
    async deletePost(req) {

    }
 }

module.exports = {Mongo}


