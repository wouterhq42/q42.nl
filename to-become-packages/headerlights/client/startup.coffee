Meteor.startup ->
  Session.setDefault "toggleLights", false
  Session.setDefault "lightsColor", Lights.findOne()?.hex or "#8cd600"
  Session.setDefault "showBgNumber", 1

  Session.setDefault("supportsInputTypeColor", (->
    # http://stackoverflow.com/a/8278718/16308
    i = document.createElement "input"
    i.setAttribute "type", "color"
    i.type isnt "text"
  )())

Router.onBeforeAction ->
  SubsManager.subscribe "lights"
  @next()
