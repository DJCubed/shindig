'use strict';

var superagent = require('superagent');
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
var app = require('../server').app;

describe('Users JSON api', function(){
  var id;

  it('can create a new shindig', function(done){
    superagent.post('http://localhost:3000/api/v1/shindigs')
      .send(
        {
        title: 'Bowling at Belltown',
        date: 'Sept 65, 1898',
        time: '2pm',
        location:'Belltown Billiards',
        participants: [],
        description: '',
        interests: [],
        owner: ''
      })
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body._id).to.not.be.eql(null);
        expect(res.body.first_name).to.be.eql('Jonah');
        expect(res.body.last_name).to.be.eql('Kirangi');
        id = res.body._id;
        done();
      });
  });

  // it('can get users collection', function(done){
  //   superagent.get('http://localhost:3000/api/v1/users').end(function(e, res){
  //     expect(e).to.eql(null);
  //     expect(res.body.length).to.be.above(0);
  //     done();
  //   });
  // });

  // it('can get a single user', function(done){
  //   superagent.get('http://localhost:3000/api/v1/users/' + id).end(function(e, res){
  //     expect(e).to.eql(null);
  //     expect(res.body._id).to.be.eql(id);
  //     expect(res.body.first_name).to.be.eql('Jonah');
  //     expect(res.body.last_name).to.be.eql('Kirangi');
  //     done();
  //   });
  // });

  // // it('does not reveal the password hash for a user', function(done) {
  // //   superagent.get('http://localhost:3000/api/v1/users/' + id).end(function(e, res){
  // //     if (res.body.local) {
  // //       expect(res.body.local.password).to.eql('[FILTERED]');
  // //     }
  // //     done();
  // //   });
  // // });

  // it('can update a user', function(done){
  //   superagent.put('http://localhost:3000/api/v1/users/' + id).send({first_name: 'JD', last_name: 'Lorence'})
  //   .end(function(e,res){
  //     expect(e).to.eql(null);
  //     expect(res.body.msg).to.be.eql('success');

  //     done();
  //   });
  // });

  // it('can delete a user' , function(done){
  //   superagent.del('http://localhost:3000/api/v1/users/' + id).end(function(e,res){
  //     expect(e).to.eql(null);
  //     expect(res.body.msg).to.be.eql('success');

  //     done();
  //   });
  // });
 });
