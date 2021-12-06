const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const cors = require('cors');
const cookieParser = require('cookie-parser')
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const morgan = require('morgan');
// const path = require('path');

const app = express();

app.use(express.json());
app.use(cookieParser())
app.set("trust proxy", 1)
app.use(
    session({
      secret: process.env.SESSION_SECRET || 'anysecret',
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
        secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
      }
    })
);

app.use(
    cors({
      credentials: true,
      origin: "https://dsa-book-frontend.herokuapp.com/"
    })
  );
app.use(morgan('dev'));

app.use('/api/blogs',blogRouter);
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);

module.exports = app ;