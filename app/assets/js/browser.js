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

//Click events
$(function(){
	function formatTime(d) {
    
    	var hh = d.getHours();
    	var m = d.getMinutes();
    	var s = d.getSeconds();
    	var dd = "AM";
    	var h = hh;
    	if (h >= 12) {
        	h = hh-12;
        	dd = "PM";
    	}
    	if (h == 0) {
        	h = 12;
    	}
    	m = m<10?"0"+m:m;
    	s = s<10?"0"+s:s;
    	h = h<10?"0"+h:h;
    	var pattern = new RegExp("0?"+hh+":"+m+":"+s);
    	var repalcement = h+":"+m;
    	repalcement += " "+dd;    
    	return replacement;
	}
});