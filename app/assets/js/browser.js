'use strict';
/*jshint unused:false */

// load jquery et all via browserify
var $        = require('jquery');
var _        = require('underscore');
var Backbone = require('backbone');
Backbone.$   = $;

var ApplicationRouter = require('./routers/ApplicationRouter');

$(function() {
  var appRouter = new ApplicationRouter();
  appRouter.start();

  $('.backbone').click(function(e) {
    e.preventDefault();
    appRouter.navigate('register', {trigger: true});
  });

});

$(function(){
	$('#joinBtn').mousedown(function(){
		$('#joinImg').css("background-image", '../JoinHoverClick-50.png');
	});
});
