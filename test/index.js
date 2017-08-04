var express = require('express');
var routes = require('../index')
var app = express();

app.use(routes(__dirname + '/routes'))

var server = app.listen(3005, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});