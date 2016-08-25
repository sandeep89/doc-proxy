var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  delete req.headers['accept-encoding'];
  delete req.headers['content-length'];
  delete req.headers.host;
  delete req.headers.cookie;
  delete req.headers.connection;
  next();
})
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getEndpoint', function (req, res, next) {

   res.send({
    dummy:"Responding to Get request",
    headers: req.headers,
    query: req.query
   });
});

app.post('/postEndpoint', function (req, res, next) {
   res.send({
    dummy:"Response to POST request",
    headers: req.headers,
    body: req.body
   });
});

app.put('/putEndpoint', function (req, res, next) {
   res.send({
    dummy:"Response to PUT request",
    headers: req.headers,
    body: req.body
   });
});

app.patch('/patchEndpoint', function (req, res, next) {
   res.send({
    dummy:"Response to PATCH request",
    headers: req.headers,
    body: req.body
   });
});


app.delete('/deleteEndpoint', function (req, res, next) {
   res.send({
    dummy:"Response to DELETE request",
    headers: req.headers
   });
});

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
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send( {
    message: err.message,
    error: {}
  });
});

var port = '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

server.on('listening', function () {
   console.log("Listening server on port 3000"); 
});
