'use strict';
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-casper');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-mongoimport');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-notify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ['build'],
      dev: {
        src: ['build/server.js', 'build/<%= pkg.name %>.css', 'build/<%= pkg.name %>.js']
      },
      prod: ['dist']
    },
    copy: {
      prod: {
        expand: true,
        cwd: 'app/assets/',
        src: ['*.html', 'images/**/*' ],
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      },
      dev: {
        expand: true,
        cwd: 'app/assets/',
        src: ['*.html', 'images/**/*' ],
        dest: 'build/',
        flatten: true,
        filter: 'isFile'
      }
    },
    browserify: {
      prod: {
        src: ['app/assets/js/*.js'],
        dest: 'dist/browser.js',
        options: {
          transform: ['debowerify'],
          debug: false
        }
      },
      dev: {
        src: ['app/assets/js/*.js'],
        dest: 'build/browser.js',
        options: {
          transform: ['debowerify'],
          debug: true
        }
      }
    },
    sass: {
      dist: {
        files: {'build/css/styles.css': 'app/assets/scss/styles.scss'}
      },
      dev: {
        options: {
          includePaths: ['app/assets/scss/'],
          sourceComments: 'map'
        },
        files: {'build/css/styles.css': 'app/assets/scss/styles.scss'}
      }
    },
    simplemocha:{
      dev:{
        src:['test/*_test.js','!test/acceptance/*_test.js'],
        options:{
          reporter: 'spec',
          slow: 200,
          timeout: 1000
        }
      }
    },
    watch:{
      all:{
        files:['server.js', 'api/models/*.js'],
        tasks:['jshint']
      },
      express: {
        files:  ['server.js','api/**/*','app/assets/**/*'],
        tasks:  ['clean', 'copy', 'sass:dev', 'browserify:dev', 'express:dev'],
        options: {
          // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions.
          // Without this option specified express won't be reloaded
          spawn: false
        }
      }
    },
    express: {
      options: {
        /* will be something here*/
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'server.js'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'server.js', 'api/models/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true,
        globals: {
          console: true,
          module: true
        }
      }
    },
    notify: {
      server: {
        options: {
          message: 'Server is ready'
        }
      },
      express: {
        options: {
          message: 'express is ready'
        }
      },
      watch: {
        options: {
          message: 'watch'
        }
      }
    },
    casper: {
      acceptance : {
        options : {
          test : true,
        },
        files : {
          'test/acceptance/casper-results.xml' : ['test/acceptance/*_test.js']
        }
      }
    },
    mongoimport: {
      options: {
        db : 'shindig-development',
      // optional
      // host : 'localhost',
      // port: '27017',
      // username : 'username',
      // password : 'password',
      // stopOnError : false,
        collections : [
          {
            name : 'users',
            type : 'json',
            file : 'db/seeds/users.json',
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          },
          {
            name : 'shindigs',
            type : 'json',
            file : 'db/seeds/shindigs.json',
            jsonArray : true,
            upsert : true,
            drop : true
          }
        ]
      }
    },
    concurrent: {
      buildDev: ['sass:dev', 'browserify:dev']
    }
  });

  //grunt mocha cov
  grunt.registerTask('server', ['build:dev','express:dev','watch:express','notify']);
  //grunt.registerTask('test:acceptance',['express:dev','casper']);
  grunt.registerTask('default', ['test','watch:express']);
  grunt.registerTask('build:dev',  ['clean:dev', 'concurrent:buildDev', 'copy:dev']);
  //grunt.registerTask('build:prod', ['clean:prod', 'browserify:prod', 'copy:prod']);
  grunt.registerTask('test', ['simplemocha:dev', 'casper']);
  grunt.registerTask('travis', ['jshint', 'simplemocha:dev', 'casper']);
  // grunt.registerTask('travis', ['jshint', 'mochacov:unit', 'mochacov:coverage', 'mochacov:coveralls']);

};
