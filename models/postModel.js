const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    user_name : {
        type : String ,
       
    },
    postHeadline: {
        type: String 
    } ,
    postDescription: {
        type: String ,
        
    }
});

const Post = mongoose.model('Post',postSchema);

module.exports =  Post;