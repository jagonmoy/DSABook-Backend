const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const posts = JSON.parse(fs.readFileSync('./mock-data/blogs.json'));

app.get('/api/posts',(req,res) => {
    res.status(200).json({
        status : 'success' ,
        data: {
            posts
        }
    });
});
app.get('/api/posts/:id',(req,res) => {
    const id  = req.params.id*1;
    const post = posts.find(el => el.user_id === id);
    if (!post) {
        return res.status(404).json({
            status : 'Failure' ,
            message : 'Not found'
        });
    }
    res.status(200).json({
        status : 'success' ,
        data: {
            post
        }
    });
});

app.post('/api/posts',(req,res) => {
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
})

app.patch('/api/posts/:id',(req,res) => {
    const id  = req.params.id*1;
    const post = posts.find(el => el.user_id === id);
    if (!post) {
        return res.status(404).json({
            status : 'Failure' ,
            message : 'Not found'
        });
    }
    res.status(200).json({
        status : 'success' ,
        message : 'Post is updated'
    });
});

app.delete('/api/posts/:id',(req,res) => {
    const id  = req.params.id*1;
    const post = posts.find(el => el.user_id === id);
    if (!post) {
        return res.status(404).json({
            status : 'Failure' ,
            message : 'Not found'
        });
    }
    res.status(204).json({
        status : 'success' ,
        message : null
    });
});


const port = 3005 ;
app.listen(port, () => {
    console.log(`${port} is running`);
});
