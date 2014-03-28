'use strict';
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: 'http://localhost:3000/somewhere/events',
  defaults: {
    date: '',
    time: '',
    location: '',
    owner: '',
    title: '',
    description: '',
    participants: [],
    interests: []
  }
});