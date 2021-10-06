const express = require('express');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const morgan = require('morgan');

const app = express();



app.use(morgan('dev'));
app.use(express.json());

app.use('/api/posts',postRouter);
app.use('/api/users',userRouter);

module.exports = app ;
