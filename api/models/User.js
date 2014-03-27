var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shindig-development');

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
