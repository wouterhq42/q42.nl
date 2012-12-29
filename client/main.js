Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});

Template.body.content = function() {
  var page = Session.get("page") || "home";
  var template = Template[page] || Template["error404"];
  reattachBehavior();
  return template();
};

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
  Meteor.defer(handleLinkClicks);
  Meteor.defer(homepageShowreel);
  Meteor.defer(addPolaroidFunctionality);
  Meteor.defer(qsausInit);
  Meteor.defer(koffieteller);
  Meteor.defer(codeteller);
  Meteor.defer(function() {
    $($("section")[0]).addClass("show");
    $("#homecontent").addClass("show");
  });
  Meteor.defer(function() {
    window.scrollTo(0,0);
  });
}