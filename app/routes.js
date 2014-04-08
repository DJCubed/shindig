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


// Make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

