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
      $("#facebookLikeBox").append('<div class="fb-facepile" data-href="https://www.facebook.com/q42bv" data-max-rows="3" data-colorscheme="dark" data-size="large" data-show-count="true"></div>')

      $("#facebookLikeBox").append('<div class="fb-like" data-href="https://facebook.com/q42bv" data-width="300" data-layout="standard" data-action="like" data-colorscheme="dark" data-show-faces="false" data-share="true"></div>')

      FB.init appId: '535367106516027', xfbml: true, version: 'v2.0'
      $(window).unbind "scroll", scrollHandler
      Meteor.setTimeout (-> $("#facebookLikeBox").addClass "visible"), 1500
  $.getScript '//connect.facebook.net/en_US/sdk.js', ->
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
