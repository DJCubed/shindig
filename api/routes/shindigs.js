'use strict';

var Shindig = require('../models/Shindig');
var User = require('../models/User');
var Passport = require('passport');

exports.collection = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  Shindig.find({}, function(err, shindigs){
    if(err){
      res.writeHead(500);
      res.send({'error': err});
    } else{
      res.send(shindigs);
    }
  });
};

exports.createShindig = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var shindig = new Shindig(req.body);
  shindig.owner = req.user.username;
  shindig.save(function(err, responseShindig){
    if(err){
      res.writeHead(500);
      res.send({'error': err});
    } else {
      res.send(responseShindig);
    }
  });
};

exports.findShindigById = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id;
  Shindig.findOne({'_id': String(id)}, function(err, responseShindig){
    if(err) {
      res.send({'error': err});
    } else {
      res.send(responseShindig);
    }
  });
};

exports.findShindigByInterests = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  //var interests = ['hiking', 'biking'];
  Shindig.find({'interests': { "$in": req.user.interests } },
  function(err, responseShindigs) {
    if (err) {
      res.send({'error': err.stack});
    } else {
      res.send(responseShindigs);
    }
  });
};

exports.updateShindig = function(req, res){
  //res.setHeader('Content-Type', 'application/json');
  var id = req.params.id;
  var shindig = req.body;
  Shindig.update({'_id': String(id)}, shindig, function(err){
    if(err) {
      res.send({'error': err});
    } else {
      res.send({msg: 'success'});
    }
  });
};

exports.deleteShindig = function(req, res){
  var id = String(req.params.id);
  Shindig.remove({'_id': id}, function(err){
    if(err) {
      res.send({'error': err});
    } else {
      res.send({msg: 'success'});
    }
  });
};
