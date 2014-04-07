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

  // save new shindig
 //  app.post('/saveshindig', isLoggedIn, function(req, res) {
 //  		// load up the shindig model
	// 	var Shindig = require('../api/models/Shindig');
	// 	var shinDig = new Shindig();
	// 	// Populate the model
	// 	shinDig.title = req.body.title;
	// 	shinDig.date = req.body.date;
	// 	shinDig.start_time = req.body.start_time;
	// 	shinDig.end_time = req.body.end_time;
	// 	shinDig.location = req.body.location;
	// 	shinDig.description = req.body.description;
	// 	shinDig._owner = req.user.email;

	// 	shinDig.save(function(err) {
 //            if (err)
 //              throw err;
 //          });

	// 	res.render('index', {
	// 		partials:{'content':'shindigList'},
	// 		subTitle: 'ShindigList',
	// 		username : req.user.username // get the user out of session and pass to template
	// 	});
	// });



};

// Make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

