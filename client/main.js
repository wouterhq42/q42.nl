Meteor.startup(function () {
  $(window).bind('resize', resizeFBwidget);
  Backbone.history.start({pushState: true});
});

Template.body.content = function() {
  var page = Session.get("page") || "home";
  var template = Template[page] || Template["error404"];
  return template();
};
Template.body.rendered = function() {
  reattachBehavior();
}

Template.body.viewRendersHeader = function() {
  var page = Session.get("page") || "home";
  return page == "home";
};

Template.error404.url = function() {
  return document.location.pathname;
};

function handleLinkClicks() {
  $("a[href^='/']").click(function(evt) {
    Router.loadPage(this.getAttribute("href"));
    return false;
  });
}

function reattachBehavior() {
  handleLinkClicks();
  homepageShowreel();
  addPolaroidFunctionality();
  qsausInit();
  koffieteller();
  codeteller();

  // fade in new page
  $($("section")[0]).addClass("show");
  $("#homecontent").addClass("show");

  // scroll to top of page
  window.scrollTo(0,0);

  // facebook widget
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/nl_NL/all.js#xfbml=1&appId=292443547438127";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));

  resizeFBwidget();
}