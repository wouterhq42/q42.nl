@reattachBehavior = ->
  return if /phantom/i.test navigator.userAgent
  attachGoogleAnalytics()
  attachFacebook()
  attachTwitter()
  resizeFBwidget()
  attachUnveil()

@resizeFBwidget = ->
  $('.fb_iframe_widget iframe').width('100%')

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

initCalled = no
attachFacebook = ->
  $.getScript '//connect.facebook.net/en_US/all.js', ->
    if initCalled
      FB.XFBML.parse()
    else
      FB.init appId: '535367106516027', xfbml: true, version: 'v2.1'
      initCalled = yes

attachTwitter = ->
  if window.location.href.match("/blog")
    $.getScript '//platform.twitter.com/widgets.js', ->
      twttr?.widgets?.load()
