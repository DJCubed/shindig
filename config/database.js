module.exports = {

  dev: {
    // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
	  'url': 'mongodb://localhost/shindig-dev'
  },

  test: {
    'url': 'mongodb://localhost/shindig-test'
  },

  prod: {
    'url': 'mongodb://heroku_app23901847:vih8fhrsa0dl1gk08bioir02it@ds043457.mongolab.com:43457/heroku_app23901847'
  }
};
