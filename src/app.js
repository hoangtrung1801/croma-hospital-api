require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const apiRouter = require('./api/index');

const app = express();

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Connected to mongodb"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("Welcome to Croma Hospital");
})

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.all('*', (req, res, next) =>  {
  const err = new Error("Not found page");
  err.statusCode = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  // return error message 
  res.status(err.statusCode || 500);
  res.json({
    status: 'fail',
    error: err.message
  })
});

module.exports = app;
