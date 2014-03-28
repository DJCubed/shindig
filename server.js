var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'build')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var users = require('./api/routes/users');

app.get('/api/v1/users', users.collection);

app.post('/api/v1/users', users.createUser);

app.get('/api/v1/users/:id', users.findUserById);

app.put('/api/v1/users/:id', users.updateUser);

app.delete('/api/v1/users/:id', users.deleteUser);

var shindigs = require('./api/routes/shindigs');

app.get('/api/v1/shindigs', shindigs.collection);

app.post('/api/v1/shindigs', shindigs.createShindig);

app.get('/api/v1/shindigs/:id', shindigs.findShindigById);

app.put('/api/v1/shindigs/:id', shindigs.updateShindig);

app.delete('/api/v1/shindigs/:id', shindigs.deleteShindig);

var server = http.createServer(app);
server.listen(3000, function(){
   console.log("server running");
});
