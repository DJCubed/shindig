// app/routes.js
//jshint unused:false
'use strict';

module.exports = function(app, passport) {
  
	app.get('/login', function(req, res) {
		res.render('login', { 
			message: req.flash('loginMessage') }); 
	});


	// process the registration form
	app.post('/saveNewUser', passport.authenticate('local-login', {
		successRedirect : '/survey', // redirect to the secure profile section
		failureRedirect : '/register', // redirect back to the registration page if error
		failureFlash : true // allow flash messages
	}));

	// process the signup form
    app.post('/register', passport.authenticate('local-signup', {
        // redirect to the secure profile section
        successRedirect : '/survey',
        // redirect back to the signup page if there is an error
        failureRedirect : '/register',
        // allow flash messages
        failureFlash : true
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

  // process the signup form
    app.post('/survey', passport.authenticate('local-signup', {
        // redirect to the secure profile section
        successRedirect : '/shingList',
        // redirect back to the signup page if there is an error
        failureRedirect : '/survey',
        // allow flash messages
        failureFlash : true
        }));

  // display shindig
  app.get('/shindig', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index', {
			partials: {'content': 'shindig',},
			subTitle: 'Shindig'
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
	res.redirect('/');
}
