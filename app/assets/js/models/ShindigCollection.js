'use strict';
var Backbone = require('backbone');
var Shindig = require('./Shindig');

module.exports = Backbone.Collection.extend({
  model: Shindig,
  url: 'http://dj3shindig.herokuapp.com/api/v1/shindigs',
  //urlRoot: 'http://localhost:3000/api/v1/shindigs',
  operator: 'date'
});
