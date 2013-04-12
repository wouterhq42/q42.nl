var Q42Router = Backbone.Router.extend({
  routes: {
    "": "main",
    "blog": "blog",
    "blog/page/:page": "blog",
    "blog/tagged/:tag": "blogtagged",
    "blog/tagged/:tag/page/:page": "blogtagged",
    "blog/post/:id": "blogpost",
    "blog/post/:id/": "blogpost",
    "blog/post/:id/:slug": "blogpost",
    ":page": "main"
  },
  main: function (page) {
    // forward to domain without www. prefix. fallback in case server-side redirect doesn't work for some reason
    if (window.location.hostname.indexOf("www.") == 0) {
      window.location.href = window.location.href.replace("http://www.", "http://");
      return;
    }

    if (page)
      page = page.split("#")[0].split("?")[0];

    Session.set("page", page);

    if (page) {
      var pageTitle = page[0].toUpperCase() + page.substring(1).replace("-", " ");

      document.title = pageTitle || "Q42";

      if (document.title != "Q42")
        document.title += " - Q42";
    }
    
    this.checkFragmentId();
  },
  blog: function (page, tag)
  {
    Session.set("blogpage", 1*page || 0);
    Session.set("blogtag", tag || "");
    Session.set("blogpostid", -1);
    this.main("blog");
  },
  blogpost: function (id)
  {
    Session.set("blogpostid", 1*id);
    this.main("blogpost");
  },
  blogtagged: function (tag, page)
  {
    this.blog(page, tag.replace(/[\-\+]/g, ' '));
  },
  loadPage: function (page) {
    this.navigate(page, {trigger: true});
  },
  checkFragmentId: function () {
    if (window.location.hash)
    {
      var $el = $(window.location.hash);
      if ($el[0])
      {
        // Wait a bit, the first check can come before the scroll to top of a page nav.
        Meteor.setTimeout(function() {
          $el[0].scrollIntoView();
        }, 100);
      }
      else
      {
        // Try again in a second.
        Meteor.setTimeout(function() {
          Router.checkFragmentId();
        }, 1000);
      }
    }
  }
});
Router = new Q42Router;