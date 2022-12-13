const mongoose = require('mongoose');

//establishing the connection to mongodb database

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;