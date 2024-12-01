require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://fileShare:Tepr5My1GNHEErRw@innshare.7kwas.mongodb.net/inShare?retryWrites=true&w=majority&appName=innShare', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Removed useCreateIndex and useFindAndModify
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
