Meteor.startup ->
  lang = if window.location.hostname is "q42.com" or window.location.hostname is "q42comsite.scalingo.io" then "en" else "nl"
  Session.setDefault "lang", lang
  moment.locale lang

  Session.setDefault "date", new Date()
  Meteor.setInterval ->
    Session.set "date", new Date()
  , 1000

  $.ajaxSetup cache: yes

  # see 6_animation.styl#29
  if not /Firefox/.test(navigator.userAgent) and (!(window.ActiveXObject) && "ActiveXObject" in window)
    $("head").append $("<style/>").text(".container > * { opacity: 0 }")
