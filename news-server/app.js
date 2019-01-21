var createError = require('http-errors'); // todo ?
var express = require('express'); // todo all to const
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // todo use winston also for writing to file

var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json()); // TODO ?
app.use(express.urlencoded({ extended: false })); // todo ? body-parser
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/news', newsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // todo ?
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.stack);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
