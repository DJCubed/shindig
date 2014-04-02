'use strict';
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: 'http://localhost:3000/api/v1/shindigs',
  defaults: {
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    owner: '',
    title: '',
    description: '',
    participants: [],
    interests: []
  }
});
