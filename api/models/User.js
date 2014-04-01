var mongoose = require('mongoose')
, Schema = mongoose.Schema;
//var Shindig = require('Shindig');
var bcrypt = require('bcrypt-nodejs');

var schema = new mongoose.Schema({
  first_name: '',
  last_name: '',
  email: '',
  username:'',
  auth: {
    local : {email : String, password : String},
    facebook : {id : String, token : String, email : String, name : String},
    twitter :{id : String, token : String, displayName : String, username : String},
    google : {id : String, token : String, email : String, name : String}
  },
  interests: [],
  shindigs : [{ type: Schema.Types.ObjectId, ref: 'Shindig' }]
  //shindigs : []
});

// generating a hash
schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.auth.local.password);
};

module.exports = mongoose.model('User', schema);
