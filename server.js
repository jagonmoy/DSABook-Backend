const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const app = require('./app');

const DatabaseConnection = async () => {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database is Connected")
}
DatabaseConnection();

const port = 3010 || process.env.PORT ;

app.listen(port, () => {
    console.log(`${port} is running`);
});


