// app/routes.js
//jshint unused:false
'use strict';

module.exports = function(app, passport) {
  
	app.post('/login', passport.authenticate('local-login', {
        // redirect to the secure profile section
        successRedirect : '/shindigList',
        // redirect back to the signup page if there is an error
        failureRedirect : '/register',
        // allow flash messages
        failureFlash : true
        }));

	// process the registration form
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
		// render the page
		res.render('index', {
			partials: {'content': 'register',},
			subTitle: 'Registration',
			message: req.flash('signupMessage')
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

  // process the survey form
    app.post('/survey', passport.authenticate('local-signup', {
        // redirect to the secure profile section
        successRedirect : '/shingList',
        // redirect back to the signup page if there is an error
        failureRedirect : '/survey',
        // allow flash messages
        failureFlash : true
        }));

  // display shindigList
  app.get('/shindigList', isLoggedIn, function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index', {
			partials: {'content': 'shindigList',},
			subTitle: 'ShindigList',
			username: req.user //get the user name from session
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
