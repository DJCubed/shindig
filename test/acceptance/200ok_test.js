'use strict';
/*global casper*/

casper.test.begin('Is app 200 ok?', 1, function suite(test) {

  casper.start('http://localhost:3000', function() {
    test.assertHttpStatus(200);
  });

  casper.run(function(){
    test.done();
  });
});
