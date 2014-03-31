module.exports = {

  dev: {
    // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
	  'url': 'mongodb://localhost/shindig-dev'
  },

  test: {
    'url': 'mongodb://localhost/shindig-test'
  },

  prod: {
    'url': 'mongodb://localhost/shindig-prod'
  }
};