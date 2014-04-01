'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  first_name: '',
  last_name: '',
  email: '',
  username:'',
  auth: {
    password: ''
  },
  interests: []
});

module.exports = mongoose.model('User', schema);
