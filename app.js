var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();

var app = express();
app.use(cors());

const { getAll } = require("./services/requests");
const { annulWorkerDates } = require("./services/worker");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const countryRouter = require("./routes/country");
const categoryRouter = require("./routes/categories");
const typeRouter = require("./routes/type");
const adminRouter = require("./routes/admin");
const techRouter = require("./routes/teck");
const ownerRouter = require("./routes/owner");
const usersRouter = require("./routes/users");
const boxRouter = require("./routes/box");
const itemRouter = require("./routes/item");
const suportRouter = require("./routes/suport");
const workerRouter = require("./routes/worker");
const orderRouter = require("./routes/order");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/tech", techRouter);
app.use("/api/v1/country", countryRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/type", typeRouter);
app.use("/api/v1/owner", ownerRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/box", boxRouter);
app.use("/api/v1/item", itemRouter);
app.use("/api/v1/suport", suportRouter);
app.use("/api/v1/worker", workerRouter);
app.use("/api/v1/order", orderRouter);

// getAll()

cron.schedule("0 0 * * *", () => {
  console.log("Running a task every day at 00:00");
  annulWorkerDates();
});

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
