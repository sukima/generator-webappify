describe "MyModule", ->
  MyModule = require "../../src/my_module.coffee"

  describe "#init", ->

    beforeEach ->
      setFixtures '<div id="output"></div>'

    it "should add a message when page loads", ->
      MyModule.init()
      expect( $("#output") ).toContainText "running"
