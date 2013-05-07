class NodeDecor

  ###
  ###

  constructor: (@node) ->
    @script = node.clip.script(@constructor.scriptName)
    @clip   = node.clip


  ###
  ###

  load: (context, callback) -> callback()

  ###
  ###

  bind: () -> 
    @clip.bind @constructor.scriptName, @_onChange

  ###
  ###

  _onChange: (value) =>

  ###
  ###

  @test: (node) -> false


module.exports = NodeDecor