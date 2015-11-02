Triggers = {
  setupPage() {
    Meteor.setTimeout(() => {
      Utils.setScrollPosition();
      Utils.setTitleAndMeta();
      reattachBehavior();
    }, 200);
  },
  checkForNewPosts: () => Meteor.call("checkTumblr"),
  set404StatusCode: () => Spiderable.httpStatusCode = 404,
  setLanguage() {
    Session.set("lang", window.location.hostname === "q42.com" ? "nl" : "en");
  }
};

FlowRouter.triggers.enter([Triggers.setLanguage, Triggers.setupPage]);

renderPage = (templateName) => {
  BlazeLayout.render("main", {
    header: "header",
    footer: "footer",
    body: templateName
  });
};

if (Meteor.isClient)
  Template.registerHelper("subsReady", () => FlowRouter.subsReady());

// Homepage
FlowRouter.route("/", {
  name: "home",
  action() { renderPage(RouteUtils.getTemplate("home")); },
  subscriptions(){this.register("allPosts", Meteor.subscribe("blogpostIndex"))}
});

blogOverview = FlowRouter.group({
  prefix: "/blog",
  triggersEnter: [Triggers.checkForNewPosts],
  subscriptions() {
    this.register("comments", Meteor.subscribe("LatestComments", 10));
  }
});

// Blog overview
blogOverview.route("/", {
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions() {
    this.register("allPosts", Meteor.subscribe("blogpostIndex", 1));
    this.register("tags", Meteor.subscribe("pagesByTag", ""));
  }
});

// Blog paging
blogOverview.route("/page/:pageNum", {
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions(params) {
    let pageNum = parseInt(params.pageNum);
    this.register("pagePosts", Meteor.subscribe("blogpostIndex", pageNum));
    this.register("tags", Meteor.subscribe("pagesByTag", ""));
  }
});

// Posts matching a given tag
blogOverview.route("/tagged/:tag",{
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions(params) {
    let tag = params.tag;
    this.register("tagPosts", Meteor.subscribe("blogpostIndex", 1, tag));
    this.register("tags", Meteor.subscribe("pagesByTag", tag || ""));
  }
});

// Actual blogpost
FlowRouter.route("/blog/post/:id/:title?", {
  name: "blogpost",
  action(){ renderPage("blogpost"); },
  triggersEnter: [Triggers.checkForNewPosts],
  subscriptions(params) {
    let id = parseInt(params.id);
    this.register("blogpost", Meteor.subscribe("blogpostFull", id));
    this.register("comments", Meteor.subscribe("blogComments", id));
    this.register("allTitles", Meteor.subscribe("blogpostTitles", 1));
  }
});

// custom blog pages matching a given tag
customBlogPages(this);

FlowRouter.route("/work/:slug", {
  name: "work",
  action(params) { renderPage("workDetail"); },
  subscriptions(params) {
    this.register("work", Meteor.subscribe("work", params.slug));
  }
});

// Any other page
FlowRouter.route("/:page", {
  name: "page",
  action(params) {
    renderPage(RouteUtils.getTemplate(params.page));
  },
  subscriptions(params) {
    if (_.contains(["over-q42", "about-q42"], params.page)){
      this.register("employees", Meteor.subscribe("employees"));
      this.register("coffeeCounter", Meteor.subscribe("coffeeCounter"));
      this.register("toilets", Meteor.subscribe("toilets"));
    }
  }
});

// not found
FlowRouter.route("/(.*)", {
  name: "404",
  triggersEnter: [Triggers.set404StatusCode],
  action() { renderPage("error404"); }
});
