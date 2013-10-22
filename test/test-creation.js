/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('basic-browserify-webapp generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('basic-browserify-webapp:app', [
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
      'test/fixtures',
      'test/spec/basic_spec.coffee',
      'test/spec/my_module_spec.coffee',
      'test/fixtures/.gitkeep',
      'src/.gitkeep',
      'src/app.coffee',
      'src/my_module.coffee'
    ];

    helpers.mockPrompt(this.app, {
      'githubUser': 'sukima',
      'packageChoices': {}
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
