const express = require('express');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const morgan = require('morgan');

const app = express();



app.use(morgan('dev'));
app.use(express.json());

app.use('/api/blogs',blogRouter);
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);



module.exports = app ;