var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
const multer = require('multer');

var config = require("./config.js");

var app = express();

app.use(cors(config.corsConfig));

app.use(
  session({
    key: "session.sid",
    secret: "QMFYs7BTDt75FKfW",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 60 * 60 * 1000 // Set to 1 hour
    }
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));




// Clean01 API routes
app.use('/', require('./routes/index') );
app.use('/users', require('./routes/users') );





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
