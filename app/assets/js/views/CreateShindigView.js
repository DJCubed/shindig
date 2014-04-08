'use strict';

var Backbone = require('backbone');
var $        = require('jquery');
Backbone.$   = $;
// var ShindigRouter = require('../routers/ShindigRouter');
var app = new Backbone.Router;

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
    "click .buttonCreate": "save"
  },

  save: function(e) {
    e.preventDefault();
    console.log("we are saving");
    //alert("save i shappening");
    //var that = this;

    var newTitle = this.$('input[name=titleCreate]').val();
    var newDate = this.$('input[name=dateCreate]').val();
    var newDescription = this.$('textarea[name=descriptionCreate]').val();
    var newStartsTime = this.$('input[name=startTimeCreate]').val();
    var newEndsTime = this.$('input[name=endTimeCreate]').val();
    var newLocation = this.$('input[name=locationCreate]').val();
    var newInterests = this.$('input:checkbox:checked').map(function () {
      return $(this).val();
      }).get();
    this.model.save({
      date: newDate,
      start_time: newStartsTime,
      end_time: newEndsTime,
      location: newLocation,
      title: newTitle,
      description: newDescription,
      participants: [],
      interests: newInterests
      }, {
      success: function (model, response) {
        //this option is the closest: it gets the full list including the latest addition
        Backbone.history.navigate('shindigs', {trigger: true, replace: true});
        //obj.trigger('shindigs', model);
        //window.shindigRouter.navigate('shindigs', {trigger: true, replace: true});
        //window.shindigRouter.index();
        // app.navigate('shindigs', {trigger: true, replace: true});
        // app.index();
      },
      // success: function() {
      //   alert("saving success");
      //   console.log("saving success");
      //   //e.preventDefault();
      //   //router = new ShindigRouter();
      //   Backbone.history.navigate('shindigs', {trigger: true});
      //   //window.shindigRouter.navigate('shindigs', {trigger: true});
      //   //window.shindigRouter.index();
      // },
      error: function() {
        alert("There were errors saving shindig");
      }
    });
  }

});
