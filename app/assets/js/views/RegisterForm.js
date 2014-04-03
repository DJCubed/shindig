'use strict';

var Backbone = require('backbone');
var $        = require('jquery');
Backbone.$   = $;

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'small-12 column',

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
/* add comma above
  save: function(e) {
    e.preventDefault();
    var newFirstName = this.$('input[name=firstName]').val();
    var newLastName = this.$('input[name=lastName]').val();
    var newDisplayName = this.$('input[name=displayName]').val();
    var newEmail = this.$('input[name=email]').val();
    var newPassword = this.$('input[name=password]').val();

    var responses = $('input[type=radio]');
    var interests = [];
    for(var i = 1; i <= 8; i++) {
      var interest = responses[i];

      if (interest === null || interest === undefined || interest === '')
      {
        continue;
      }
      interests.push(interest);
    }

    this.model.save({first_name: newFirstName, last_name: newLastName, username: newDisplayName, interests: interests}, {
      success: function() {
        Backbone.history.navigate('users', {trigger: true});
      },
      error: function() {
        alert("There were errors creating the account");
      }
    });
  }
  */
});

