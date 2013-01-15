var Q42Router = Backbone.Router.extend({
  routes: {
    "": "main",
    "blog": "blog",
    "blog/page/:page": "blog",
    "blog/post/:id/:slug": "post",
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
  blog: function (page)
  {
    if (!page)
      page = 0;
    Session.set("blogpage", page);
    this.main("blog");
  },
  post: function (id)
  {
    Session.set("blogpostid", 1*id);
    this.main("blogpost");
  },
  loadPage: function (page) {
    this.navigate(page, {trigger: true});
  }
});
Router = new Q42Router;