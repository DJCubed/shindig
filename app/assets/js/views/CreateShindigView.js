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
    var newTitle = this.$('input[name=titleCreate]').val();
    var newDate = this.$('input[name=dateCreate]').val();
    var newDescription = this.$('textarea[name=descriptionCreate]').val();
    var newStartsTime = this.$('input[name=startTimeCreate]').val();
    var newEndsTime = this.$('input[name=endTimeCreate]').val();
    var newLocation = this.$('input[name=locationCreate]').val();
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
