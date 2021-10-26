
const express = require('express');
const blogRouter = require('./routes/blogRoutes');
const morgan = require('morgan');

const app = express();



app.use(morgan('dev'));
app.use(express.json());

app.use('/api/blogs',blogRouter);


module.exports = app ;