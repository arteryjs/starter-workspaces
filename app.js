var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var session = require('express-session');
var flash = require('express-flash');
var sass = require('node-sass-middleware');
var expressSanitizer = require('express-sanitizer');
var jade = require('jade');
var helpers = require('view-helpers');
var appRoot = require('app-root-path');
var shortid = require('shortid');
var browserify = require('browserify-middleware');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env
 */
dotenv.load({ path: '.env' });


var app = express();

var mainjs = {};
  mainjs[`__dirname/public/js/main.js`] = {run: false};

app.get('/js/bundle.js', browserify(['shortid']));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
}));

app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  sourceMap: true,
  outputStyle: 'expanded'
}));



app.use(flash());
app.use(cookieParser());
app.use(expressSanitizer([]));

app.use(express.static(path.join(__dirname, 'public')));

app.use(helpers('app'));
app.locals._ = require('underscore');
app.locals.shortid = require('shortid');
app.locals.dynamicInclude = jade.renderFile;



/* here is where the foxflow module data/routing config happens */
data = require('artery-data-git');

app.use('/', 
  require('artery-routes-docs'), 
//  require('../artery/modules/artery-routes-docs'), 
  require('artery-routes-workspaces')
);


/* end config section */


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
