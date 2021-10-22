const {General} = require("./databaseService");
const {APIFeatures} = require("../../apiFeatures/features");
const Features = new APIFeatures()

const SQL = class extends General {
    async findAllBlogs(req) {
           
    } 
    async findBlog(req) {

    }
    async createBlog(req){

    }
    async updateBlog(req){

    }
    async deleteBlog(req) {

    }
 }
 
 module.exports = {SQL}
