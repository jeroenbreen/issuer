let createError, express, path, cookieParser, logger, cors,
    mongo, monk, db,
    indexRouter, bootstrapRouter, usersRouter, clientsRouter, projectsRouter, documentsRouter,
    app;

createError = require('http-errors');
express = require('express');
path = require('path');
cookieParser = require('cookie-parser');
logger = require('morgan');
cors = require('cors');

// Database
mongo = require('mongodb');
monk = require('monk');
db = monk('localhost:27017/issuer');

// routers
indexRouter = require('./routes/index');
bootstrapRouter = require('./routes/bootstrap');
usersRouter = require('./routes/users');
clientsRouter = require('./routes/clients');
projectsRouter = require('./routes/projects');
documentsRouter = require('./routes/documents');

app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', indexRouter);
app.use('/bootstrap', bootstrapRouter);
app.use('/users', usersRouter);
app.use('/clients', clientsRouter);
app.use('/projects', projectsRouter);
app.use('/documents', documentsRouter);

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
  res.render('error');
});

module.exports = app;
