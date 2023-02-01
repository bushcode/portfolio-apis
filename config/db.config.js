const mongoose = require('mongoose');
require('dotenv').config();

const MongoConnection = async () => {
  try {
    mongoose.set('strictQuery', false);
    console.log('database connection string: ', process.env.DB_URI);
    await mongoose.connect(process.env.DB_URI);
    return console.log('🔋 Mongo DB connected');
  } catch (error) {
    console.error(error);
  }
};

const closeDbConnection = async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed');
};

process.on('SIGINT', closeDbConnection);

module.exports = MongoConnection;
