module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    clean: [
      "app/app.js"
      "test/specs.js"
    ]
    browserify:
      dist:
        expand: true
        cwd: "src"
        src: "app.coffee"
        ext: ".js"
        dest: "app"
        options:
          debug: true
          transform: ["coffeeify"]
      test:
        files:
          "test/specs.js": ["test/spec/**/*.js", "test/spec/**/*.coffee"]
        options:
          debug: true
          transform: ["coffeeify"]

  grunt.loadNpmTasks("grunt-contrib-clean")
  grunt.loadNpmTasks("grunt-browserify")

  grunt.registerTask "build:dist", "Build the main module", ["browserify:dist"]
  grunt.registerTask "build:test", "Build the test module", ["browserify:test"]
  grunt.registerTask "default", "Build a distrubutable application", ["build:dist"]
  grunt.registerTask "test", "Run all tests", ["build:test"]
