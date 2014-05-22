@reattachBehavior = ->
  unless isPhantom
    attachGoogleAnalytics()
    attachFacebook()
    attachTwitter()
    resizeFBwidget()
    attachUnveil()

attachUnveil = ->
  $("img").unveil(300)

attachGoogleAnalytics = ->
  unless window._gaq
    window._gaq = []
    _gaq.push(['_setAccount', 'UA-2714808-1'])
    _gaq.push(['_trackPageview'])
    (->
      ga = document.createElement('script')
      ga.type = 'text/javascript'
      ga.async = true
      ga.src = (if 'https:' is document.location.protocol then 'https://ssl' else 'http://www') + '.google-analytics.com/ga.js'
      s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(ga, s)
    )()

initCalled = false
attachFacebook = ->
  $.getScript '//connect.facebook.net/nl_NL/all.js', ->
    unless initCalled
      FB.init appId: '535367106516027', xfbml: true
    else
      FB.XFBML.parse()
    initCalled = true

attachTwitter = ->
  $.getScript '//platform.twitter.com/widgets.js', ->
    twttr?.widgets?.load()

@resizeFBwidget = ->
  $('.fb_iframe_widget iframe').width('100%')
  Meteor.setTimeout (-> $('.fb_iframe_widget').height(400)), 200
