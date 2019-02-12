var http = require('http');
var app = require('./config/express');
var { exec } = require('child_process')

http.createServer(app).listen(3000, function() {
  console.log('Servidor iniciado');
  exec('google-chrome http://localhost:3000');
});
