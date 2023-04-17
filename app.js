const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const cors = require('cors');
const cookieParser = require('cookie-parser')
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  );
app.use(morgan('dev'));

app.use('/api/blogs',blogRouter);
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.use('*',(req,res) => {
  res.sendFile(path.resolve('views/apiRoutes.html'));
})

module.exports = app ;