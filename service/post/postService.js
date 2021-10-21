const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const {Mongo} = require("./mongo");
const {SQL} = require("./sql");

const Database = class {
  constructor() {
    if (this.Database) return this.Database;
    else {
       if(process.env.DATABASE_NAME === "MongoDB") this.Database = new Mongo();
       else if (process.env.DATABASE_NAME === "SQL") this.Database = new SQL();
    }
  }
  findAllPosts(req) {
    return this.Database.findAllPosts(req);
  }
  findPost(req){return this.Database.findPost(req);}
  createPost(req){return this.Database.createPost(req);}
  updatePost(req){return this.Database.updatePost(req);}
  deletePost(req){return this.Database.deletePost(req);}  
}

module.exports = {Database}


