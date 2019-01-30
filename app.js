require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');
const usersRouter = require('./routes/users');

const accountRouter = require('./routes/account');
const pg = require('pg');
const users = require('./db/helperFunctions/users.js');

//Authentication packages
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const pgSession = require('connect-pg-simple')(session);

const app = express();
const sessionSecret = process.env.SE_SECRET;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use( expressValidator() );

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new pgSession({
    conString: process.env.DB_URL,
    tableName : 'session'   
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  users.getByID(id).then( (userObject) => {
      console.log(userObject);
      done(null, userObject)
  } ).catch( (e) => {
      console.log(e)
  }) ;
});

passport.use(new LocalStrategy(
  function(username, password, done) {

    console.log(username, password);

    users.getOBJByUsername(username).then( (userOBJ) => {
      console.log(userOBJ.username, userOBJ.password);
      return done(null, 'text');
    } ).catch( (error) => {

      console.log('user does not exist');
      console.log(error);
      return done(null, false);

    }); 
  }
));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/users', usersRouter);
app.use('/account', accountRouter);

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