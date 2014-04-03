'use strict';

var Backbone           = require('backbone');
var $                  = require('jquery');
//var UserCollection     = require('../models/UserCollection');
//var UserCollectionView = require('../views/UserCollectionView');
var Shindig = require('../models/Shindig');
var CreateShindigView = require('../views/CreateShindigView');
var ShindigCollection  = require('../models/ShindigCollection');
var ShindigCollectionView = require('../views/ShindigCollectionView');

module.exports = Backbone.Router.extend({
  routes: {'shindigs/:id': 'show',
           'shindigs': 'index',
          'newshindig': 'create'},



  show: function(id) {
    console.log(id);
  },

  create: function() {
    console.log('create me');
    var shindigForm = new CreateShindigView({model: new Shindig});
    $('.innerContainer').replaceWith(shindigForm.el);
  },


  start: function() {
    Backbone.history.start({pushState: true});
  },

  index: function() {
    this.shindigList.fetch();
    $('.innerContainer').replaceWith(this.shindigListView.el);
  },

  initialize: function() {
    this.shindigList = new ShindigCollection();
    this.shindigListView = new ShindigCollectionView({collection: this.shindigList});
  }

});
