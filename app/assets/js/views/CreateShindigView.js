'use strict';

var Backbone = require('backbone');
var $        = require('jquery');
Backbone.$   = $;

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'createShindig',

  initialize: function() {
    this.render();
  },

  render: function() {
    var template = require('../../templates/createShindig.hbs');
    this.$el.html(template(this.model.toJSON()));
    return this;
  },

  events: {
    submit: "save"
  },

  save: function(e) {
    e.preventDefault();
    var newTitle = this.$('input[name=title]').val();
    var newDate = this.$('input[name=date]').val();
    var newDescription = this.$('input[name=description]').val();
    var newStartsTime = this.$('input[name=start_time]').val();
    var newEndsTime = this.$('input[name=end_time]').val();
    var newLocation = this.$('input[name=location]').val();
    var newOwner = "tester person";
    var newInterests = this.$('input:checkbox:checked').map(function () {
      return $(this).val();
      }).get();
    console.log(newInterests);
    this.model.save({
      date: newDate,
      start_time: newStartsTime,
      end_time: newEndsTime,
      location: newLocation,
      owner: newOwner,
      title: newTitle,
      description: newDescription,
      participants: [],
      interests: newInterests
      }, {
      success: function() {
        Backbone.history.navigate('shindigs', {trigger: true});
      },
      error: function() {
        alert("There were errors saving shindig");
      }
    });
  }

});
