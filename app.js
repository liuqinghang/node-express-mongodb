const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

// 1 middilewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

// 3 ROUTE / ROUTE HANDLE
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// SERVER START
module.exports = app;
