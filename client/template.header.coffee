templateHeaderEvents =
  "click #mobile-menu-icon": (evt) -> $("body").toggleClass "show-mobile-menu"
  "focus li a":                    -> $("body").addClass "show-mobile-menu"
  "click li a":                    -> $("body").removeClass "show-mobile-menu"
  "click #toggle-lang":            ->
    if Session.equals "lang", "en"
      Session.set "lang", "nl"
    else
      Session.set "lang", "en"

  "click #chat-toggle": (evt) ->
    Session.set "openChat", not Session.get("openChat")

  "click #toggle-fullscreen": ->
    $header = $("#header")

    isFullscreen = ->
      document.msIsFullScreen or document.mozFullScreen or document.webkitIsFullScreen or document.isFullScreen
    exitFullscreen = ->
      document.exitFullscreen?()
      document.mozCancelFullscreen?()
      _.each ["ms", "webkit"], (b) -> document["#{b}ExitFullscreen"]?()
    requestFullscreen = ->
      $header[0].requestFullscreen?()
      _.each ["ms", "moz", "webkit"], (b) -> $header[0]["#{b}RequestFullscreen"]?()
    setFullscreen = ->
      fs = isFullscreen()
      Session.set "fullscreen", fs
      $("body").toggleClass "fullscreen", fs
      $header.css height: if fs then $(window).height() else "auto"

    changeEvents = 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange'
    $(document).on changeEvents, setFullscreen

    if isFullscreen()
      exitFullscreen()
    else
      requestFullscreen()

Template.header.events templateHeaderEvents
Template.en_header?.events templateHeaderEvents
