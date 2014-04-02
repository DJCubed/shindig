'use strict';

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

// load up the user model
var User = require('../api/models/User');
// expose this function to our app using module.exports
module.exports = function(passport) {

  // passport session setup
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGNUP
  // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done, display_name) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

		  // find a user whose email is the same as the forms email
		  // we are checking to see if the user trying to login already exists
      User.findOne({ 'auth.local.email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
          return done(err);

        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }
        else {
          // if there is no user with that email
          // create the user

          var newUserSet = new User();
          newUserSet.first_name = req.body.first_name;
          newUserSet.last_name = req.body.last_name;
          newUserSet.email = email;
          newUserSet.username = req.body.display_name;


          var interests = [];
          for(var i = 1; i <= 8; i++) {
            var interest = req.body['interest' + i];

            if (interest === null || interest === undefined || interest === '')
            {
              continue;
            }

            interests.push(interest);
          }
          newUserSet.interests = interests;

          // set the user's local credentials
          newUserSet.auth.local.email = email;
          newUserSet.auth.local.password = newUserSet.generateHash(password);

          // save the user local credentials
          newUserSet.save(function(err) {
            if (err)
              throw err;
            return done(null, newUserSet);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
    function(req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'auth.local.email' :  email }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err)
          return done(err);

      // if no user is found, return the message
      if (!user)
          return done(null, false, req.flash('loginMessage', 'Invalid Email Entered.')); // req.flash is the way to set flashdata using connect-flash

      // if the user is found but the password is wrong
      if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Invalid Wrong password.')); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, user);
    });

  }));

};
