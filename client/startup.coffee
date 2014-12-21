Meteor.startup ->
  lang = if window.location.hostname is "q42.com" then "en" else "nl"
  Session.setDefault "lang", lang
  moment.locale lang

  Session.setDefault "date", new Date()
  Meteor.setInterval ->
    Session.set "date", new Date()
  , 1000

  $.ajaxSetup cache: yes
