window.reattachBehavior = function() {
  resizeShowreel();
  homepageShowreel();
  $("#page").addClass("show");

  if (!isPhantom) {
    attachGoogleAnalytics();
    attachFacebook();
    attachTwitter();
    attachGfycat();
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
var attachFacebook = function() {
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/nl_NL/all.js#xfbml=1&appId=535367106516027";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));
}
var attachTwitter = function() {
  twttr && twttr.widgets && twttr.widgets.load();
}
var attachGfycat = function() {
  (function(d, t) {
    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = 'http://assets.gfycat.com/js/gfyajax-0.517d.js';
    s.parentNode.insertBefore(g, s);
  }(document, 'script'));
}

window.resizeFBwidget = function() {
  $('.fb_iframe_widget iframe').width('100%');
}