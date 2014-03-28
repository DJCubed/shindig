'use strict';

var Backbone           = require('backbone');
var $                  = require('jquery');
var UserCollection     = require('../models/UserCollection');
var UserCollectionView = require('../views/UserCollectionView');

module.exports = Backbone.Router.extend({
  routes: {'events/:id': 'show',
           'events': 'index'},

  show: function(id) {
    console.log(id);
  },

  start: function() {
    Backbone.history.start({pushState: false});
  },

  index: function() {
    this.eventList.fetch();
    $('.mainContent').replaceWith(this.eventListView.el);
  },

  initialize: function() {
    this.eventList = new EventCollection();
    this.eventListView = new EventCollectionView({collection: this.eventList});
  }

});