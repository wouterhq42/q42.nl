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
  scrollHandler = ->
    if $(document).height() - $(window).scrollTop() < 1200
      $("#facebookLikeBox").append('<div class="fb-like-box" data-href="https://www.facebook.com/q42bv" data-width="300" data-height="400" data-colorscheme="dark" data-show-faces="true" data-header="false" data-stream="false" data-show-border="false"></div>')
      FB.init appId: '535367106516027', xfbml: true
      $(window).unbind "scroll", scrollHandler
      Meteor.setTimeout (-> $("#facebookLikeBox").addClass "visible"), 1500
  $.getScript '//connect.facebook.net/nl_NL/all.js', ->
    unless initCalled
      $(window).bind "scroll", scrollHandler
    else
      FB.XFBML.parse()
    initCalled = true

attachTwitter = ->
  $.getScript '//platform.twitter.com/widgets.js', ->
    twttr?.widgets?.load()

@resizeFBwidget = ->
  $('.fb_iframe_widget iframe').width('100%')
  Meteor.setTimeout (-> $('.fb_iframe_widget').height(400)), 200
