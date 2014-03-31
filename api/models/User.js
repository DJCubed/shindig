var mongoose = require('mongoose')
, Schema = mongoose.Schema;
//var Shindig = require('Shindig');

var schema = new mongoose.Schema({
  first_name: '',
  last_name: '',
  email: '',
  username:'',
  auth: {
    password: ''
  },
  interests: [],
  shindigs : [{ type: Schema.Types.ObjectId, ref: 'Shindig' }]
  //shindigs : []
});

module.exports = mongoose.model('User', schema);
