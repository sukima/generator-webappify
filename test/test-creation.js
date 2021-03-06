/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('webappify generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('webappify:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'bower.json',
      'Gruntfile.coffee',
      'index.html',
      'package.json',
      'testem.json',
      '.gitignore',
      '.jshintrc',
      '.editorconfig',
      'testem.json',
      'test/index.html',
      'test/spec/basic_spec.coffee',
      'test/spec/my_module_spec.coffee',
      'src/.gitkeep',
      'src/app.coffee',
      'src/my_module.coffee'
    ];

    helpers.mockPrompt(this.app, {
      'githubUser': 'someuser',
      'packageChoices': []
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('adds expected packages', function (done) {
    helpers.mockPrompt(this.app, {
      'githubUser': 'someuser',
      'packageChoices': ['q', 'backbone']
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile('bower.json', /"q":/);
      helpers.assertFile('bower.json', /"jquery":/);
      helpers.assertFile('bower.json', /"underscore":/);
      helpers.assertFile('index.html', /src=".*\/q/);
      helpers.assertFile('index.html', /src=".*\/jquery/);
      helpers.assertFile('index.html', /src=".*\/underscore/);
      helpers.assertFile('test/index.html', /src=".*\/q/);
      helpers.assertFile('test/index.html', /src=".*\/jquery/);
      helpers.assertFile('test/index.html', /src=".*\/underscore/);
      done();
    });
  });

  it('includes JQM template', function (done) {
    helpers.mockPrompt(this.app, {
      'githubUser': 'someuser',
      'packageChoices': ['jquery-mobile-bower']
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile('index.html', /data-role="page"/);
      done();
    });
  });

  it('creates a test/fixtures folder', function (done) {
    var expected = [
      'test/fixtures'
    ];

    helpers.mockPrompt(this.app, {
      'githubUser': 'someuser',
      'packageChoices': ['jquery']
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
