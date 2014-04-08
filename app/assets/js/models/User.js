'use strict';
var Backbone = require('backbone');
var bcrypt = require('bcrypt-nodejs');

module.exports = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: 'http://dj3shindig.herokuapp.com/api/v1/users',
  //urlRoot: 'http://localhost:3000/api/v1/users',
  defaults: {
    first_name: '',
    last_name: '',
    email: '',
    username:'',
    interests: []
  }
});
