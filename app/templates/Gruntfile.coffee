module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    clean: [
      "app/app.js"
      "test/specs.js"
    ]
    browserify:
      dev:
        expand: true
        cwd: "src"
        src: "app.coffee"
        ext: ".js"
        dest: "app"
        options:
          debug: true
          transform: ["coffeeify"]
      dist:
        expand: true
        cwd: "src"
        src: "app.coffee"
        ext: ".js"
        dest: "app"
        options:
          debug: false
          transform: ["coffeeify"]
      test:
        files:
          "test/specs.js": [
            "test/spec/**/*helper.js"
            "test/spec/**/*helper.coffee"
            "test/spec/**/*spec.js"
            "test/spec/**/*spec.coffee"
          ]
        options:
          debug: true
          transform: ["coffeeify"]
    watch:
      scripts:
        tasks: ["browserify:dev"]
        files: ["src/**/*"]
      livereload:
        options:
          livereload: true
        files: [
          "index.html"
          "app/**.*"
        ]

  grunt.loadNpmTasks("grunt-contrib-clean")
  grunt.loadNpmTasks("grunt-contrib-watch")
  grunt.loadNpmTasks("grunt-browserify")

  grunt.registerTask "build:dev",  "Build the main module (development)", ["browserify:dev"]
  grunt.registerTask "build:dist", "Build the main module (production)", ["browserify:dist"]
  grunt.registerTask "build:test", "Build the test module", ["browserify:test"]
  grunt.registerTask "default", "Build a distrubutable application", ["build:dev"]
  grunt.registerTask "test", "Run all tests", ["build:test"]
