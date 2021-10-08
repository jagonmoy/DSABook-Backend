const express = require('express');
const postRouter = require('./routes/post');
const morgan = require('morgan');

const app = express();



app.use(morgan('dev'));
app.use(express.json());

app.use('/api/posts',postRouter);


module.exports = app ;
