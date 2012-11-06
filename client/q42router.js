var Q42Router = Backbone.Router.extend({
  routes: {
    "": "main",
    ":page": "main"
  },
  main: function (page) {
    Session.set("page", page);
    document.title = page[0].toUpperCase() + page.substring(1).replace("-", " ") || "Q42";
    if (document.title != "Q42")
      document.title += " - Q42";
  },
  loadPage: function (page) {
    this.navigate(page, {trigger: true});
  }
});

Router = new Q42Router;

Meteor.startup(function () {
  if (window.console)
    console.log("%cWelcome to the Q42.nl console! trololololololololo :-D", "font-size: 42px; background: #000; color: yellow");
  Backbone.history.start({pushState: true});
});

function handleLinkClicks() {
  $("a[href^='/']").click(function(evt) {
    Router.loadPage(this.getAttribute("href"));
    return false;
  });
}

Template.body.content = function() {
  var page = Session.get("page") || "home";
  Meteor.defer(handleLinkClicks);
  Meteor.defer(homepageShowreel);
  Meteor.defer(addPolaroidFunctionality);
  Meteor.defer(qsausInit);
  return (Template[page] || Template["error404"])();
};

Template.body.viewRendersHeader = function() {
  var page = Session.get("page") || "home";
  return page == "home";
};

Template.error404.url = function() {
  return document.location.pathname;
};