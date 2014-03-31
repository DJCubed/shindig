var mongoose = require('mongoose');
//var User = require('User');

var schema = new mongoose.Schema({
  title: '',
  date: '',
  time: '',
  location:'',
  participants: [],
  description: '',
  _interests: '',
  //owner: ''
  _owner : ''
});

module.exports = mongoose.model('Shindig', schema);
