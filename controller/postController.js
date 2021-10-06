const fs = require('fs');
const posts = JSON.parse(fs.readFileSync('./mock-data/blogs.json'));


exports.checkID = (req,res,next,val) => {
    const post = posts.find(el => el.user_id === val);
    if (!post) {
        return res.status(404).json({
            status : 'Failure' ,
            message : 'Not found'
        });
    }
    next();
}
exports.checkPost = (req,res,next) => {
    if (!req.body.headline || !req.body.description) {
        return res.status(404).json({
            status : 'Failure' ,
            message : 'Failed to Create a post'
        });
    }
    next();
}

exports.getAllPosts = (req,res) => {
    res.status(200).json({
        status : 'success' ,
        data: {
            posts
        }
    });
}
exports.getPost = (req,res) => {    
    res.status(200).json({
        status : 'success' ,
        data: {
            post
        }
    });
}
exports.createPost = (req,res) => {
    const newId = posts.length ;
    const newPost = Object.assign({user_id : newId},req.body);
    
    posts.push(newPost);
    fs.writeFile('./mock-data/blogs.json',JSON.stringify(posts),(err)=>{
        res.status(201).json({
            status : 'success' ,
            data: {
                newPost
            } 
        });
    });
}
exports.updatePost = (req,res) => {
    res.status(200).json({
        status : 'success' ,
        message : 'Post is updated'
    });
}
exports.deletePost = (req,res) => {
    res.status(200).json({
        status : 'success' ,
        message : 'Post is Deleted'
    });
}
