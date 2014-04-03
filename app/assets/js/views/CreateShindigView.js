'use strict';

var Backbone = require('backbone');
var $        = require('jquery');
Backbone.$   = $;

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'createShindig',

  initialize: function() {
    console.log("initializing CS view");
    this.render();
  },

  render: function() {
    var template = require('../../templates/createShindig.hbs');
    this.$el.html(template);
    console.log(this.$el.html() + "render CS view");
    return this;
  }
});
