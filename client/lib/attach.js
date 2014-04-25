window.reattachBehavior = function() {
  if (!isPhantom) {
    attachGoogleAnalytics();
    attachFacebook();
    attachTwitter();
    resizeFBwidget();
  }
}

var attachGoogleAnalytics = function() {
  if (!window._gaq) {
    window._gaq = [];
    _gaq.push(['_setAccount', 'UA-2714808-1']);
    _gaq.push(['_trackPageview']);
    (function () {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  }
}
var initCalled = false;
var attachFacebook = function() {
  $.getScript('//connect.facebook.net/nl_NL/all.js', function(){
    if (!initCalled)
      FB.init({ appId: '226130564064804', xfbml: true });
    else
      FB.XFBML.parse();
    initCalled = true;
  });
}
var attachTwitter = function() {
  twttr && twttr.widgets && twttr.widgets.load();
}

window.resizeFBwidget = function() {
  $('.fb_iframe_widget iframe').width('100%');
  Meteor.setTimeout(function() {$('.fb_iframe_widget').height(400)}, 200);
}
