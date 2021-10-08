const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');


dotenv.config({path : './config.env'})


const DatabaseConnection = async () => {
    await mongoose.connect(process.env.DATABASE,{
        useNewUrlParser : true ,
        useCreateIndex: true ,
        useFindAndModify: false
    });
    console.log("Database is Connected")
}
DatabaseConnection();

const port = 3010 || process.env.PORT ;

app.listen(port, () => {
    console.log(`${port} is running`);
});