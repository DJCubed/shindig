'use strict';

var Backbone = require('backbone');
var $        = require('jquery');
Backbone.$   = $;

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'event',

  initialize: function() {
    this.render();
  },

  render: function() {
    var eventAttributes = this.model.toJSON();
    var template = require('../../templates/event.hbs');
    this.$el.html(template(eventAttributes));
    return this;
  }
});