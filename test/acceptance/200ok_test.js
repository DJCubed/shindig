'use strict';
/*global casper*/

casper.test.begin('Is app 200 ok?', 3, function suite(test) {

  casper.start('http://localhost:3000', function() {
    test.assertHttpStatus(200);
  });

  casper.then(function(){
    test.assertTitle('Shindig | Login', 'title is Shindig');
  });

  casper.then(function(){
    test.assertExists('div#loginBox');
  });

  casper.run(function(){
    test.done();
  });
});
