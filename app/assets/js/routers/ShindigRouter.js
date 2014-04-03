'use strict';

var Backbone           = require('backbone');
var $                  = require('jquery');
//var UserCollection     = require('../models/UserCollection');
//var UserCollectionView = require('../views/UserCollectionView');
var ShindigCollection  = require('../models/ShindigCollection');
var ShindigCollectionView = require('../views/ShindigCollectionView');

module.exports = Backbone.Router.extend({
  routes: {'shindigs/:id': 'show',
           'shindigs': 'index'},



  show: function(id) {
    console.log(id);
  },

  start: function() {
    Backbone.history.start({pushState: true});
  },

  index: function() {
    console.log("WINNING");
    this.shindigList.fetch();
    $('.mainContent').replaceWith(this.shindigListView.el);
  },

  initialize: function() {
    console.log("INIT");
    this.shindigList = new ShindigCollection();
    this.shindigListView = new ShindigCollectionView({collection: this.shindigList});
  }

});
