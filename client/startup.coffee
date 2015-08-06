Meteor.startup ->
  lang = if window.location.hostname is "q42.com" then "en" else "nl"
  Session.setDefault "lang", lang
  moment.locale lang

  $.ajaxSetup cache: yes

  # see 6_animation.styl#29
  isFirefox = /Firefox/.test(navigator.userAgent)
  isIE11 = not window.ActiveXObject and `"ActiveXObject" in window`
  unless isFirefox or isIE11
    $("head").append $("<style/>").text(".container > * { opacity: 0 }")
