isFullscreen = ->
  document.msIsFullScreen or document.mozFullScreen or document.webkitIsFullScreen or document.isFullScreen
exitFullscreen = ->
  document.exitFullscreen?()
  document.mozCancelFullScreen?()
  _.each ["ms", "webkit"], (b) ->
    document["#{b}ExitFullscreen"]?()
    document["#{b}ExitFullScreen"]?()
requestFullscreen = ->
  $header = $("#header")
  $header[0].requestFullscreen?()
  _.each ["ms", "moz", "webkit"], (b) ->
    $header[0]["#{b}RequestFullscreen"]?()
    $header[0]["#{b}RequestFullScreen"]?()
setFullscreen = ->
  $header = $("#header")
  fs = isFullscreen()
  Session.set "fullscreen", fs
  $("body").toggleClass "fullscreen", fs
  $header.css height: if fs then $(window).height() else "auto"
toggleFullscreen = ->
  if isFullscreen()
    exitFullscreen()
  else
    requestFullscreen()

Meteor.startup ->
  Session.set "fullscreen", no
  changeEvents = 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange'
  $(document).on changeEvents, setFullscreen

templateHeaderEvents =
  "click li a, click #chat-toggle": -> exitFullscreen()
  "click #toggle-fullscreen": -> toggleFullscreen()

Template.header.events templateHeaderEvents
Template.en_header?.events templateHeaderEvents

Template.fullscreen.helpers
  fullscreenIcon: -> if Session.equals("fullscreen", yes) then "compress" else "expand"
