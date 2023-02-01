const mongoose = require('mongoose');
require('dotenv').config();

const MongoConnection = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.DATABASE_URL);
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
