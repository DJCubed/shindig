'use strict';

var superagent = require('superagent');
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
var app = require('../server').app;

describe('shindigs JSON api', function(){
  var id;
  //var interests = 'swimming';

  it('can create a new shindig', function(done){
    superagent.post('http://localhost:3000/api/v1/shindigs')
      .send({
        title: 'Bowling at Belltown',
        date: 'Sept 65, 1898',
        time: '2pm',
        location:'Belltown Billiards',
        participants: ['Jonah', 'Dale', 'JD'],
        description: 'Awesome event',
        interests: ['swimming', 'hipster'],
        owner: 'Jessica'
      })
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body._id).to.not.be.eql(null);
        expect(res.body.title).to.be.eql('Bowling at Belltown');
        expect(res.body.date).to.be.eql('Sept 65, 1898');
        expect(res.body.interests).to.be.eql(['swimming', 'hipster']);
        id = res.body._id;
        done();
      });
  });

  // it('can get shindigs collection', function(done){
  //   superagent.get('http://localhost:3000/api/v1/shindigs').end(function(e, res){
  //     expect(e).to.eql(null);
  //     expect(res.body.length).to.be.above(0);
  //     done();
  //   });
  // });

  it('can get a single shindig', function(done){
    superagent.get('http://localhost:3000/api/v1/shindigs/' + id).end(function(e, res){
      expect(e).to.eql(null);
      console.log(res.body + " response");
      expect(res.body._id).to.be.eql(id);
      expect(res.body.title).to.be.eql('Bowling at Belltown');
      expect(res.body.date).to.be.eql('Sept 65, 1898');
      done();
    });
  });

  it('can get all shindigs with specific interests', function(done){
    superagent.get('http://localhost:3000/api/v1/shindigs/').end(function(e, res){
      //expect(e).to.eql(null);
      console.log(res.body);
      //expect(res.body.interests).to.be.eql(interests);
      //expect(res.body.title).to.be.eql('Bowling at Belltown');
      //expect(res.body.date).to.be.eql('Sept 65, 1898');
      done();
    });
  });

  it('can update an shindig', function(done){
    superagent.put('http://localhost:3000/api/v1/shindigs/' + id).send({title: 'Bowling at Ballard', date: 'Sept 65, 1998'})
    .end(function(e,res){
      expect(e).to.eql(null);
      expect(res.body.msg).to.be.eql('success');

      done();
    });
  });

  it('can delete a shindig' , function(done){
    superagent.del('http://localhost:3000/api/v1/shindigs/' + id).end(function(e,res){
      expect(e).to.eql(null);
      expect(res.body.msg).to.be.eql('success');

      done();
    });
  });
});
