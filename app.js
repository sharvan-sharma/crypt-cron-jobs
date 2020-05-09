const createError = require('http-errors');
const express = require('express');
const path = require('path')
const logger = require('morgan');
const dbConnection = require('./src/config/dbconnect')
const jobs = require('./src/jobs/index')
const cron = require('node-cron');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

cron.schedule(`0 */5 * * * *`, () => {
  //stop app from idling
  console.log('i am awake')
})

jobs.userjob()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
