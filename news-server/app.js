const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

const notFoundErrorHandler = require('./errors/notFound');
const config = require('./config/config');

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const usersRouter = require('./routes/users');

const mongoose = require('mongoose');
const { database } = config;

mongoose.connect(database, { useNewUrlParser: true, 'useFindAndModify': false });
const db = mongoose.connection;

db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', function (err) {
  console.log(err);
});

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: true, // default - false
  saveUninitialized: true,
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger(':url :date[web]', {
//   stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(notFoundErrorHandler);

module.exports = app;
