'use strict';
/*global casper*/

casper.test.begin('Is register view ok?', 3, function suite(test) {

  casper.start('http://localhost:3000/#register', function() {
    test.assertHttpStatus(200);
  });

  casper.then(function(){
    test.assertTitle('Shindig | Login', 'title is Shindig');
  });

  casper.then(function() {
    test.assertExists('div.formTexts');
  });

  casper.run(function(){
    test.done();
  });
});
