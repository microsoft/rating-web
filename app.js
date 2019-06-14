var path = require("path");
var express = require("express");

var DIST_DIR = path.join(__dirname, "dist");
var STATIC_DIR = path.join(__dirname, "static");
var PORT = 8080;
var app = express();

console.log(`ENV KUBE_NODE_NAME: `, process.env.KUBE_NODE_NAME);
console.log(`ENV KUBE_POD_NAME: `, process.env.KUBE_POD_NAME);
console.log(`ENV KUBE_POD_IP: `, process.env.KUBE_POD_IP);
console.log(`ENV API: `, process.env.API);
console.log(`ENV SITE_CODE: `, process.env.SITE_CODE);

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));
app.use("/static",express.static(STATIC_DIR));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
});

app.listen(PORT);

module.exports = app;