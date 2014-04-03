'use strict';

var Backbone           = require('backbone');
var $                  = require('jquery');
var UserCollection     = require('../models/UserCollection');
var UserCollectionView = require('../views/UserCollectionView');
var RegisterForm       = require('../views/RegisterForm');

module.exports = Backbone.Router.extend({
  routes: {'register': 'create',
           'users/:id': 'show',
           'users': 'index'},

  create: function() {
    var registerForm = new RegisterForm({model: new User});
    $('.mainContent').replaceWith(registerForm.el);
  },

  show: function(id) {
    console.log(id);
  },

  start: function() {
    Backbone.history.start({pushState: false});
  },

  index: function() {
    this.userList.fetch();
    $('.mainContent').replaceWith(this.userListView.el);
  },

  initialize: function() {
    this.userList = new UserCollection();
    this.userListView = new UserCollectionView({collection: this.userList});
  }

});
