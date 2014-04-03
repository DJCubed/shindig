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
    var shindigAttributes = this.model.toJSON();
    var template = require('../../templates/shindig.hbs');
    this.$el.html(template(shindigAttributes));
    return this;
  }
});
