var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var chocofacRouter = require("./routes/chocofac");
var balanceRouter = require("./routes/balance");
var ingredientstockRouter = require("./routes/ingredientstock");
var chocostockRouter = require("./routes/chocostock");
var recipeRouter = require("./routes/recipe");
var requestRouter = require("./routes/request");
var ingredientRouter = require("./routes/ingredient");
var userRouter = require("./routes/user");

var app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, HEAD",
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", chocofacRouter);
app.use("/balance", balanceRouter);
app.use("/ingredientstock", ingredientstockRouter);
app.use("/chocostock", chocostockRouter);
app.use("/recipe", recipeRouter);
app.use("/request", requestRouter);
app.use("/ingredient", ingredientRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
