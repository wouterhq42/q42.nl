@reattachBehavior = ->
  unless /phantom/i.test navigator.userAgent
    attachGoogleAnalytics()
    attachFacebook()
    attachTwitter()
    resizeFBwidget()
    attachUnveil()

attachUnveil = ->
  $("img").unveil(300)

attachGoogleAnalytics = ->
  ((i, s, o, g, r, a, m) ->
    i["GoogleAnalyticsObject"] = r
    i[r] = i[r] or ->
      (i[r].q = i[r].q or []).push arguments
      return

    i[r].l = 1 * new Date()

    a = s.createElement(o)
    m = s.getElementsByTagName(o)[0]

    a.async = 1
    a.src = g
    m.parentNode.insertBefore a, m
    return
  ) window, document, "script", "//www.google-analytics.com/analytics.js", "ga"
  ga "create", "UA-2714808-1", "auto"
  ga "require", "displayfeatures"
  ga "require", "linkid", "linkid.js"
  ga "send", "pageview"

initCalled = false
attachFacebook = ->
  scrollHandler = ->
    if $(document).height() - $(window).scrollTop() < 1200
      $("#facebookLikeBox").append('<div class="fb-facepile" data-href="https://www.facebook.com/q42bv" data-max-rows="3" data-colorscheme="dark" data-size="large" data-show-count="true"></div>')

      $("#facebookLikeBox").append('<div class="fb-like" data-href="https://facebook.com/q42bv" data-width="300" data-layout="standard" data-action="like" data-colorscheme="dark" data-show-faces="false" data-share="true"></div>')

      FB.init appId: '535367106516027', xfbml: true, version: 'v2.1'
      $(window).unbind "scroll", scrollHandler
      Meteor.setTimeout (-> $("#facebookLikeBox").addClass "visible"), 1500
  $.getScript '//connect.facebook.net/en_US/all.js', ->
    unless initCalled
      $(window).bind "scroll", scrollHandler
    else
      FB.XFBML.parse()
    initCalled = true

attachTwitter = ->
  if window.location.href.match("/blog")
    $.getScript '//platform.twitter.com/widgets.js', ->
      twttr?.widgets?.load()

@resizeFBwidget = ->
  $('.fb_iframe_widget iframe').width('100%')
  #Meteor.setTimeout (-> $('.fb_iframe_widget').height(400)), 200
