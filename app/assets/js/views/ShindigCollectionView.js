'use strict';
var Backbone      = require('backbone');
var $             = require('jquery');
Backbone.$    = $;
var ShindigView   = require('./ShindigView');

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'ShindigList',

  initialize: function() {
    this.collection.on('add', this.addShindig, this);
  },

  addShindig: function(shindig) {
    var shindigView = new ShindigView({model: shindig});
    this.$el.append(shindigView.el);
  },

  addAll: function() {
    this.fetch();
    this.collection.forEach(this.addShindig);
  },

  render: function() {
    this.addAll();
  }
});
