var Q42Router = Backbone.Router.extend({
  routes: {
    "": "main",
    ":page": "main"
  },
  main: function (page) {
    if (page && page.indexOf("#") > -1)
      page = page.split("#")[0];

    if (page && page.indexOf("?") > -1)
      page = page.split("?")[0];

    Session.set("page", page);

    if (page) {
      var pageTitle = page[0].toUpperCase() + page.substring(1).replace("-", " ");

      document.title =  pageTitle || "Q42";

      if (document.title != "Q42")
        document.title += " - Q42";
    }
  },
  loadPage: function (page) {
    this.navigate(page, {trigger: true});
  }
});
Router = new Q42Router;