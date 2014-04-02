// app/routes.js
//jshint unused:false
'use strict';

module.exports = function(app, passport) {


	// display landing page
  app.get('/', function(req, res) {
		// render the page
		res.render('index', {
			partials: {'content': 'login',},
			subTitle: 'Login',
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
    // redirect to the shindigList
    successRedirect : '/shindigList',
    // redirect back to the signup page if there is an error
    failureRedirect : '/',
    // allow flash messages
    failureFlash : true,
  }));

	// process the registration form
  app.post('/register', passport.authenticate('local-signup', {
    // redirect to the secure profile section
    successRedirect : '/shindigList',
    // redirect back to the signup page if there is an error
    failureRedirect : '/register',
    // allow flash messages
    failureFlash : true
  }));


	 // display registration form
  app.get('/register', function(req, res) {
		// render the page
		res.render('index', {
			partials: {'content': 'register',},
			subTitle: 'Registration',
			message: req.flash('signupMessage')
		});
	});

  // save new shindig
  app.post('/saveshindig', isLoggedIn, function(req, res) {
  		// load up the shindig model
		var Shindig = require('../api/models/Shindig');
		var shinDig = new Shindig();
		// Populate the model
		shinDig.title = req.body.title; 
		shinDig.date = req.body.date;
		shinDig.time = req.body.time;
		shinDig.location = req.body.location;
		shinDig.description = req.body.description;
		shinDig._owner = req.user.email;

		shinDig.save(function(err) {
            if (err)
              throw err;
          });

		res.render('index', {
			partials:{'content':'shindigList'},
			subTitle: 'ShindigList',
			username : req.user.username // get the user out of session and pass to template
		});
	});

  //display new shindig form
  app.get('/newshindig', isLoggedIn, function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('index', {
			partials: {'content': 'newShindig',},
			subTitle: 'NewShindig',
			username: req.user.username //get the userlogin doc from session
		});
	});


  // display shindigList
  app.get('/shindigList', isLoggedIn, function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('index', {
			partials: {'content': 'shindigList',},
			subTitle: 'ShindigList',
			username: req.user.username //get the userlogin doc from session
		});
	});

  app.post('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

};

// Make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
