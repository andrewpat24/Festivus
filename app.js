require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var passport = require('passport')
var session = require('express-session');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
   secret: 'keyboard cat',
   saveUnitialized: true,
   resave: true
}));
// Initialize passport! Also using passport.session() middleware, to support persistent login sessions
app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// festivals.searchLikeFestivals('Outside Lands San Francisco')
//   .then(function (result, error) {
//     console.log(result);
//   });

// let festivalObj = {
//   name: "Outside Lands",
//   show_url:"https://www.sfoutsidelands.com/",
//   location:"San Francisco, California",
//   date_span:"August 10-12",
//   genre: 'variety',
//   bio: `The Outside Lands Music and Arts Festival is a music festival held annually in San Francisco, California, at Golden Gate Park. The first edition occurred from August 22 to 24, 2008.`,
//   logo: "https://www.sfoutsidelands.com/uploads/outside-lands-2018-social-share-image.jpg"
// }

// festivals.addFestival(festivalObj)
//   .then((res) => {
//     console.log("added festival", res);
//   })

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/users', usersRouter);

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
