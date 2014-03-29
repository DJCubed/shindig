// app/routes.js
//jshint unused:false
'use strict';

module.exports = function(app, passport) {

  // display the login form
  app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index', {
			partials: {'content': 'login'},
			message: req.flash('loginMessage')
		});
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// route for twitter authentication and login
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

  // display signup form
  app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index', {
			partials: {'content': 'signup',},
			message: req.flash('signupMessage')
		});
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		// redirect to the secure profile section
		successRedirect : '/profile',
		// redirect back to the signup page if there is an error
		failureRedirect : '/signup',
		// allow flash messages
		failureFlash : true
	}));

	// PROFILE SECTION
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('index', {
      partials: {'content': 'profile',},
      // get the user out of session and pass to template
			user : req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}