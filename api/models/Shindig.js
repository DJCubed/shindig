'use strict';

var mongoose = require('mongoose');
//var User = require('User');

var schema = new mongoose.Schema({
  title: '',
  date: '',
  start_time: '',
  end_time: '',
  location:'',
  participants: [],
  description: '',
  interests: '',
  owner: ''
});

module.exports = mongoose.model('Shindig', schema);
