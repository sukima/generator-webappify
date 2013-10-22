'use strict';
var util = require('util');
var url = require('url');
var path = require('path');
var yeoman = require('yeoman-generator');

var proxy = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || null;
var githubOptions = {
  version: '3.0.0'
};

if (proxy) {
  githubOptions.proxy = {};
  githubOptions.proxy.host = url.parse(proxy).hostname;
  githubOptions.proxy.port = url.parse(proxy).port;
}

var GitHubApi = require('github');
var github = new GitHubApi(githubOptions);

var checkPackageDependencies = function (packageChoices) {
  if (packageChoices['jquery-mobile-bower']) { packageChoices.jquery = true; }
  if (packageChoices.backbone) { packageChoices.underscore = true; }
  if (packageChoices.jquery) { packageChoices['jasmine-jquery'] = true; }
  packageChoices.jasmine = true;
  return packageChoices;
};

var chooseDependencies = function (list) {
  var choice, dependencies = [];
  for (choice in list) {
    if (this.packageChoices[choice]) {
      dependencies.push('"' + choice + '": "' + list[choice] + '"');
    }
  }
  return dependencies.join(',\n    ');
};

var BasicBrowserifyWebappGenerator = module.exports = function BasicBrowserifyWebappGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw err;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

util.inherits(BasicBrowserifyWebappGenerator, yeoman.generators.Base);

BasicBrowserifyWebappGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name:    'githubUser',
    message: 'Would you mind telling me your username on GitHub?',
    default: 'someuser'
  }, {
    type:    'checkbox',
    name:    'packageChoices',
    message: 'What packages can I include?',
    choices: [
      {name: 'jQuery',        value: 'jquery',              checked: true},
      {name: 'Underscore',    value: 'underscore',          checked: true},
      {name: 'jQuery Mobile', value: 'jquery-mobile-bower', checked: false},
      {name: 'Backbone',      value: 'backbone',            checked: false},
      {name: 'Q (promises)',  value: 'q',                   checked: false}
    ]
  }];

  this.prompt(prompts, function (props) {
    this.githubUser     = props.githubUser;
    this.packageChoices = checkPackageDependencies(props.packageChoices);
    this.chooseDependencies = chooseDependencies.bind(this);

    done();
  }.bind(this));
};

BasicBrowserifyWebappGenerator.prototype.userInfo = function userInfo() {
  var done = this.async();

  githubUserInfo(this.githubUser, function (res) {
    /*jshint camelcase:false */
    this.realname = res.name;
    this.email = res.email;
    this.githubUrl = res.html_url;
    done();
  }.bind(this));
};

BasicBrowserifyWebappGenerator.prototype.app = function app() {
  this.mkdir('test');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('index.html', 'index.html');
  this.template('test/index.html', 'test/index.html');
};

BasicBrowserifyWebappGenerator.prototype.tests = function tests() {
  this.mkdir('test');
  this.mkdir('test/fixtures');
  this.mkdir('test/spec');
  this.copy('test/spec/basic_spec.coffee', 'test/spec/basic_spec.coffee');
  this.copy('test/spec/my_module_spec.coffee', 'test/spec/my_module_spec.coffee');
  this.copy('testem.json', 'testem.json');
};

BasicBrowserifyWebappGenerator.prototype.gitfiles = function gitfiles() {
  this.copy('gitignore', '.gitignore');
  this.mkdir('test');
  this.mkdir('test/fixtures');
  this.write('test/fixtures/.gitkeep', '');
  this.mkdir('src');
  this.write('src/.gitkeep', '');
};

BasicBrowserifyWebappGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('Gruntfile.coffee', 'Gruntfile.coffee');
  this.mkdir('src');
  this.copy('src/app.coffee', 'src/app.coffee');
  this.copy('src/my_module.coffee', 'src/my_module.coffee');
};
