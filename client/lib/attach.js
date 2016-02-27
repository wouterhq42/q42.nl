reattachBehavior = function(){
  if (/phantom/i.test(navigator.userAgent)) return;
  attachGoogleAnalytics();
  if (window.location.href.match("/blog")){
    attachFacebook();
    attachTwitter();
  }
};

let attachedGoogleAnalytics = false;
const attachGoogleAnalytics = function(){
  if (attachedGoogleAnalytics) return;

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-2714808-1', 'auto');
  ga("require", "displayfeatures");
  ga("require", "linkid", "linkid.js");
  ga('send', 'pageview');

  attachedGoogleAnalytics = true;
};


let initCalled = false;
const attachFacebook = function(){
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    if (initCalled){
      FB.XFBML.parse();
    } else {
      FB.init({appId: '226130564064804', xfbml: true, version: 'v2.5'});
      initCalled = true;
    }
  });
};


const attachTwitter = function(){
  $.getScript('//platform.twitter.com/widgets.js', function(){
    if (twttr && twttr.widgets) twttr.widgets.load();
  });
};
