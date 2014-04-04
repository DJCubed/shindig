'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var cons = require('consolidate');
var users = require('./api/routes/users');
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require('connect-flash');
require('./config/passport')(passport); // pass passport for configuration

app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/app/assets/templates');


app.configure(function(){
  app.use(express.bodyParser());//get html forms info
  app.use(express.static(path.join(__dirname, 'build')));
  app.use(express.cookieParser());//For authorization
  app.use(express.session({
    secret: 'shindigisgoodshindigisdopeshin'
  }));
  app.use(passport.initialize());
  app.use(passport.session());//to persist login sessions
  app.use(flash());//for session flash messages
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(express.logger('dev'));//log request to terminal
});

mongoose.connect('mongodb://localhost/shindig-development');

// Make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

require('./app/routes')(app, passport);//pass passport to routes.js

app.get('/api/*', isLoggedIn);

app.get('/api/v1/users', users.collection);

app.post('/api/v1/users', users.createUser);

app.get('/api/v1/users/:id', users.findUserById);

app.put('/api/v1/users/:id', users.updateUser);

app.delete('/api/v1/users/:id', users.deleteUser);

var shindigs = require('./api/routes/shindigs');

//app.get('/api/v1/shindigs', shindigs.collection);

app.post('/api/v1/shindigs', shindigs.createShindig);

app.get('/api/v1/shindigs/:id', shindigs.findShindigById);

app.get('/api/v1/shindigs', shindigs.findShindigByInterests);

app.put('/api/v1/shindigs/:id', shindigs.updateShindig);

app.delete('/api/v1/shindigs/:id', shindigs.deleteShindig);


// process the registration form
app.post('/register', passport.authenticate('local-signup', {
  // redirect to the secure profile section
  successRedirect : '/#shindigs',
  // redirect back to the signup page if there is an error
  failureRedirect : '/#register',
  // allow flash messages
  failureFlash : true
}));

app.post('/login', passport.authenticate('local-login', {
  // redirect to the shindigList
  successRedirect : '/#shindigs',
  // redirect back to the signup page if there is an error
  failureRedirect : '/',
  // allow flash messages
  failureFlash : true,
}));


var server = http.createServer(app);
server.listen(3000, function(){ //create secure server here (see oaa secureServer.js)
  console.log('server running');
});
