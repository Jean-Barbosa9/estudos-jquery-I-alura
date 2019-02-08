var http = require('http');
var app = require('./config/express');

http.createServer(app).listen(3000, function() {
  console.log('Servidor iniciado');
  console.log('abra o navegador na url http://localhost:3000');
});
