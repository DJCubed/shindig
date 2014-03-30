// app/routes.js
//jshint unused:false
'use strict';

module.exports = function(app, passport) {
  

	// process the registration form
	app.post('/saveNewUser', passport.authenticate('local-login', {
		successRedirect : '/survey', // redirect to the secure profile section
		failureRedirect : '/register', // redirect back to the registration page if error
		failureFlash : true // allow flash messages
	}));

	 // display registration form
  app.get('/register', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index', {
			partials: {'content': 'register',},
			subTitle: 'Registration'
		});
	});

	 // display survey form
  app.get('/survey', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index', {
			partials: {'content': 'survey',},
			subTitle: 'Survey'
		});
	});

  // display shindig
  app.get('/shindig', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index', {
			partials: {'content': 'shindig',},
			subTitle: 'Shindig'
		});
	});

};