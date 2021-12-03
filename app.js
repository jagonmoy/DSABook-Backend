const express = require('express');
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
app.use(cors());
app.use(morgan('dev'));

app.use('/api/blogs',blogRouter);
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'build','index.html'))
    })
}

module.exports = app ;