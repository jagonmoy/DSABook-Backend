const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const {Mongo} = require("./mongoService");
const {SQL} = require("./sqlService");

const Database = class {
  constructor() {
    if (this.Database) return this.Database;
    else {
       if(process.env.DATABASE_NAME === "MongoDB") this.Database = new Mongo();
       else if (process.env.DATABASE_NAME === "SQL") this.Database = new SQL();
    }
  }
  findAllBlogs(req) {
    return this.Database.findAllBlogs(req);
  }
  findBlog(req){return this.Database.findBlog(req);}
  createBlog(req){return this.Database.createBlog(req);}
  updateBlog(req){return this.Database.updateBlog(req);}
  deleteBlog(req){return this.Database.deleteBlog(req);}  
}

module.exports = {Database}


