var path = require("path");
var express = require("express");

var DIST_DIR = path.join(__dirname, "dist");
var STATIC_DIR = path.join(__dirname, "static");
var PORT = 3000;
var app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));
app.use("/static",express.static(STATIC_DIR));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Send index.html when the user access the web
app.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(PORT);

module.exports = app;