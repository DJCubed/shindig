'use strict';

function startServer() {
  // Initialize 'newrelic' if a license key is present
  if (process.env.NEWRELIC_LICENSE_KEY !== null &&
     process.env.NEWRELIC_LICENSE_KEY !== undefined) {
    // 'newrelic' module should never be able to crash the server
    try {
      require('newrelic');
    }
    catch (error) {
      console.warn('New Relic has crashed on initialization.\n\n' + error.stack);
    }
  }

  var express  = require('express');
  var app      = express();
  var cons     = require('consolidate');
  var http     = require('http');
  var path     = require('path');
  var port     = process.env.PORT || 3000;
  var passport = require('passport');
  var flash    = require('connect-flash');
  var mongoose = require('mongoose');
  require('./config/passport')(passport);


  // set up consolidate and handlebars templates
  app.engine('hbs', cons.handlebars);
  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/app/assets/templates');

  app.configure(function() {
    app.use(express.json());
    app.use(express.cookieParser());
    app.use(express.static(path.join(__dirname, 'build')));
    var RedisStore = require('connect-redis')(express);
    // example of options
    // var redisOptions = { db: 'sessions', post: 6379, host: '127.0.0.1' };

    // session secret TODO move to node-foreman's .env / process.env
    var session_secret = process.env.OAA_SESSION_SECRET || 'CHANGEMECHANGEMECHANGEMECHANGEME';
    app.use(express.session({ store: new RedisStore(), secret: session_secret }));
    app.use(passport.initialize());
    // persistent login sessions (do not want for REST API)
    app.use(passport.session());
    // use connect-flash for flash messages stored in session
    app.use(flash());
    app.use(app.router);
  });


  app.configure('development', function() {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
    mongoose.connect('mongodb://localhost/oaa-development');
  });


  app.configure('test', function() {
    mongoose.connect('mongodb://localhost/oaa-test');
  });

  // server generated pages routes
  require('./app/routes.js')(app, passport);

  // api routes
  var users = require('./api/routes/userRoutes');
  var meetings = require('./api/routes/meetingRoutes');
  var agendaItems = require('./api/routes/agendaItemRoutes');

  // Users routes
  app.get('/api/v1/users', users.collection);
  app.get('/api/v1/users/:id', users.findById);
  app.post('/api/v1/users', users.create);
  app.put('/api/v1/users/:id', users.update);
  app.delete('/api/v1/users/:id', users.destroy);

  // Meetings Routes
  app.get('/api/v1/meetings', meetings.collection);
  app.get('/api/v1/meetings/:id', meetings.findById);
  app.post('/api/v1/meetings', meetings.create);
  app.put('/api/v1/meetings/:id', meetings.update);
  app.delete('/api/v1/meetings/:id', meetings.destroy);

  // Agenda Item Routes
  app.get('/api/v1/meetings/:meeting_id/agenda_items', agendaItems.collectionByMeeting);
  app.get('/api/v1/agenda_items', agendaItems.collection);
  app.get('/api/v1/agenda_items/:id', agendaItems.findById);
  app.post('/api/v1/meetings/:meeting_id/agenda_items', agendaItems.createByMeeting);
  app.post('/api/v1/agenda_items', agendaItems.create);
  app.put('/api/v1/agenda_items/:id', agendaItems.update);
  app.delete('/api/v1/agenda_items/:id', agendaItems.destroy);

  // uncomment this if you want to use pushState:true in UserRouter.js start
  // app.get('/users*', function(req, res) {
  //   res.redirect('/#users' + req.params);
  // });

  var server = http.createServer(app);

  server.listen(port, function(){
    console.log('Running on port ' + port);
  });
}


if (process.env.CLUSTER === 'true') {
  var numCPUs = parseInt(process.env.NUM_CHILDREN) || require('os').cpus().length;
  var cluster = require('cluster');
  var worker;

  if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
      worker = cluster.fork();
      console.log('Worker ', worker.process.pid, ' has spawned.');
    }

    cluster.on('exit', function(worker, code, signal) {
      console.log('worker ', worker.process.pid, ' has died a horrible, slow death.', code, signal);
      cluster.fork();
    });

  // Child processes will execute this
  } else {
    console.log('Starting web server on', process.pid);
    startServer();
  }
} else {
  startServer();
}
