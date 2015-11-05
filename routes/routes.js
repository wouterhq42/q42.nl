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
    Session.set("lang", window.location.hostname === "q42.com" ? "en" : "nl");
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

/*****************************************************************************/
// HOMEPAGE                                                                   /
/*****************************************************************************/
FlowRouter.route("/", {
  name: "home",
  action() { renderPage(RouteUtils.getTemplate("home")); },
  subscriptions() {
    this.register("postsWithAuthors", Meteor.subscribe("postsWithAuthors"));
    this.register("employeeCount", Meteor.subscribe("employeeCount"));
  }
});

/*****************************************************************************/
// BLOG                                                                       /
/*****************************************************************************/
const blogOverview = FlowRouter.group({
  prefix: "/blog",
  triggersEnter: [Triggers.checkForNewPosts]
});
blogOverview.route("/", {
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions() {
    this.register("allPosts", Meteor.subscribe("blogpostIndex", 1));
    this.register("tags", Meteor.subscribe("pagesByTag", ""));
  }
});
blogOverview.route("/page/:pageNum", {
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions(params) {
    const pageNum = parseInt(params.pageNum);
    this.register("pagePosts", Meteor.subscribe("blogpostIndex", pageNum));
    this.register("tags", Meteor.subscribe("pagesByTag", ""));
  }
});
blogOverview.route("/tagged/:tag",{
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions(params) {
    const tag = params.tag;
    this.register("tagPosts", Meteor.subscribe("blogpostIndex", 1, tag));
    this.register("tags", Meteor.subscribe("pagesByTag", tag || ""));
  }
});
FlowRouter.route("/blog/post/:id/:title?", {
  name: "blogpost",
  action(){ renderPage("blogpost"); },
  triggersEnter: [Triggers.checkForNewPosts],
  subscriptions(params) {
    const id = parseInt(params.id);
    this.register("blogpost", Meteor.subscribe("blogpostFull", id));
    this.register("comments", Meteor.subscribe("blogComments", id));
    this.register("allTitles", Meteor.subscribe("blogpostTitles", 1));
  }
});

/*****************************************************************************/
// CUSTOM BLOG PAGES                                                          /
/*****************************************************************************/
customBlogPages(this);

/*****************************************************************************/
// WORK                                                                       /
/*****************************************************************************/
FlowRouter.route("/work/tagged/:tag", {
  name: "workTag",
  action: () => renderPage("work"),
  subscriptions(params) {
    this.register("workTags", Meteor.subscribe("workTags"));
    this.register("work", Meteor.subscribe("work", null, params.tag));
  }
});
FlowRouter.route("/work/:slug", {
  name: "work",
  action(params) { renderPage("workDetail"); },
  subscriptions(params) {
    this.register("work", Meteor.subscribe("work", params.slug));
  }
});
FlowRouter.route("/work", {
  name: "workOverview",
  action: () => renderPage("work"),
  subscriptions(params) {
    this.register("workTags", Meteor.subscribe("workTags"));
    this.register("work", Meteor.subscribe("work"));
  }
});

/*****************************************************************************/
// ANY OTHER PAGE                                                             /
/*****************************************************************************/
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

/*****************************************************************************/
// NOT FOUND                                                                  /
/*****************************************************************************/
FlowRouter.route("/(.*)", {
  name: "404",
  triggersEnter: [Triggers.set404StatusCode],
  action() { renderPage("error404"); }
});
