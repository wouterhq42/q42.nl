@isPhantom = /phantom/i.test navigator.userAgent

Meteor.startup ->
  $(window).resize _.debounce(resizeFBwidget, 300)
  $(window).scroll _.throttle ->
    $(document.body).toggleClass "scrolled", $(window).scrollTop() > 0
  , 100

  lang = if _.last(window.location.hostname.split(".")) is "com" then "en" else "nl"
  Session.setDefault "lang", lang
  moment.lang lang

  Session.setDefault "date", new Date()
  Meteor.setInterval ->
    Session.set "date", new Date()
  , 1000

  setupLights()

  Deps.autorun -> Meteor.subscribe("allUserData")

  marked.setOptions breaks: true

  Typekit.load()

  $.ajaxSetup cache: yes

setupLights = ->
  Session.setDefault "toggleLights", false
  Session.setDefault "lightsColor", "#000000"

  Session.setDefault("supportsInputTypeColor", (->
    # http://stackoverflow.com/a/8278718/16308
    i = document.createElement "input"
    i.setAttribute "type", "color"
    i.type isnt "text"
  )())

  Deps.autorun ->
    turnOnLights = Session.get("toggleLights") isnt (Session.get("date").getHours() > 20 or Session.get("date").getHours() < 7)
    $(document.body).toggleClass "lights-off", turnOnLights