Meteor.startup ->
  $(window).resize _.debounce(resizeFBwidget, 300)

  lang = if window.location.hostname is "q42.com" then "en" else "nl"
  Session.setDefault "lang", lang
  moment.locale lang

  Session.setDefault "date", new Date()
  Meteor.setInterval ->
    Session.set "date", new Date()
  , 1000

  setupLights()

  new Konami -> Session.set("headerGameActive", yes)

  Session.setDefault "openChat", no
  Session.setDefault "employees_filter", "Q'er"
  Session.setDefault "headerGameActive", no

  $.ajaxSetup cache: yes

setupLights = ->
  Session.setDefault "toggleLights", false
  Session.setDefault "lightsColor", Lights.findOne()?.hex or "#8cd600"
  Session.setDefault "showBgNumber", 1

  Session.setDefault("supportsInputTypeColor", (->
    # http://stackoverflow.com/a/8278718/16308
    i = document.createElement "input"
    i.setAttribute "type", "color"
    i.type isnt "text"
  )())
