'use strict';

var Backbone = require('backbone');
var $        = require('jquery');
Backbone.$   = $;

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'register',

  initialize: function() {
    this.render();
  },

//  events: {
//    submit: 'save'
//  },

  render: function() {
    var template = require('../../templates/register.hbs');
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
});

