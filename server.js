const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const routes = require('./routes/index.routes');

var DB_URI;

app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('trust proxy', 1);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log('MongoDB Connected');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const connectDB = async () => {
  try {
    process.env.NODE_ENV === 'development'
      ? (DB_URI = process.env.DB_URI)
      : (DB_URI = process.env.PROD_DB_URI);

    console.log('DB: ', DB_URI);
    const conn = await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use('/', routes);
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function errorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({ error: res.locals.message });
});

const port = process.env.PORT || 3110;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
