# generator-webappify [![Build Status](https://secure.travis-ci.org/sukima/generator-webappify.png?branch=master)](https://travis-ci.org/sukima/generator-webappify)

A generator for [Yeoman](http://yeoman.io).

This generator will make a simple webapp which uses [Jasmine][], [CoffeeScript][], and [Browserify][]. Out of the box it supports [testem][].

You can any choose the following packages: [jQuery][], [jQuery Mobile][JQM], [Underscore][], [Backbone][], and [Q][]

It uses [Jasmine][] for the test framework. And will also include [Jasmine jQuery][jasminejq] if needed.

[CoffeeScript]: http://coffeescript.org/
[Browserify]: http://browserify.org/
[testem]: https://github.com/airportyh/testem
[Jasmine]: http://pivotal.github.io/jasmine/
[jasminejq]: https://github.com/velesin/jasmine-jquery
[jQuery]: http://jquery.com/
[JQM]: http://jquerymobile.com/
[Underscore]: http://underscorejs.org/
[Backbone]: http://backbonejs.org/
[Q]: http://documentup.com/kriskowal/q/

## Grunt tasks

- `default` - Build `app/app.js` from modules in `src/` folder.
- `test` - Build `test/specs.js` from specs in `test/spec/` folder.
- `clean` - Removes build files.

## Output

    output/
    ├── Gruntfile.coffee
    ├── bower.json
    ├── index.html
    ├── package.json
    ├── src
    │   ├── app.coffee
    │   └── my_module.coffee
    ├── test
    │   ├── fixtures
    │   ├── index.html
    │   └── spec
    │       ├── basic_spec.coffee
    │       └── my_module_spec.coffee
    └── testem.json

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-webappify from npm, run:

```
$ npm install -g generator-webappify
```

Finally, initiate the generator:

```
$ yo webappify
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
