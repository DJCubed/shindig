'use strict';

var Backbone           = require('backbone');
var $                  = require('jquery');
var UserCollection     = require('../models/UserCollection');
var UserCollectionView = require('../views/UserCollectionView');

module.exports = Backbone.Router.extend({
  routes: {'shindigs/:id': 'show',
           'shindigs': 'index'},

  show: function(id) {
    console.log(id);
  },

  start: function() {
    Backbone.history.start({pushState: false});
  },

  index: function() {
    this.shindigList.fetch();
    $('.mainContent').replaceWith(this.shindigListView.el);
  },

  initialize: function() {
    this.shindigList = new ShindigCollection();
    this.shindigListView = new ShindigCollectionView({collection: this.eventList});
  }

});