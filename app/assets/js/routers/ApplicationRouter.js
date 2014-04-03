'use strict';

var Backbone      = require('backbone');
var ShindigRouter = require('./ShindigRouter');
var UserRouter    = require('./UserRouter');
var $             = require('jquery');

module.exports = Backbone.Router.extend({

  start:function() {
    Backbone.history.start({pushState: true});
  },

  initialize: function() {
    this.userRouter = new UserRouter();
    this.shindigRouter = new ShindigRouter();
  }

});
