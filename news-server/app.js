const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const notFoundErrorHandler = require('./errors/notFound');

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger(':url :date[web]', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/news', newsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(notFoundErrorHandler);

module.exports = app;
