'use strict';

var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/shindig-development');

var schema = new mongoose.Schema({
  title: '',
  date: '',
  time: '',
  location:'',
  participants: [],
  description: '',
  interests: [],
  owner: ''
});

module.exports = mongoose.model('Shindig', schema);
