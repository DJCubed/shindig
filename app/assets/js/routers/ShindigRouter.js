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
    console.dir(shindigForm.el);
    $('.innerContainer').replaceWith(shindigForm.el);
  },


  index: function() {
    console.log('now in shindigsrouterss');
    //$('.mainContent').html('hello not the world');
    //$('mainContent').html(this.shindigListView.el);
    // var shindigList = new ShindigCollection();
    // var shindigListView = new ShindigCollectionView({collection: shindigList});
    this.shindigList.fetch();
    console.dir(this.shindigListView.el);
    // if ($('.innerContainer')) {
    //   console.log("innerContainer");
    //   $('.innerContainer').replaceWith(this.shindigListView.el);
    // } else {
    //   console.log('createShindig');
    //   $('.createShindig' || '.innerContainer').replaceWith(this.shindigListView.el);
    // }
    //$('.createShindig' || '.innerContainer').replaceWith(this.shindigListView.el);
    $('.createShindig').replaceWith(this.shindigListView.el);
    $('.innerContainer').replaceWith(this.shindigListView.el);
    //$('.innerContainer').html("hello yall");
    //$('.createShindig').replaceWith("hello");
  },

  initialize: function() {
    this.shindigList = new ShindigCollection();
    this.shindigListView = new ShindigCollectionView({collection: this.shindigList});
  }

});
