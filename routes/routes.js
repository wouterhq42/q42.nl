import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'
import { Spiderable } from 'meteor/ongoworks:spiderable'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import { Utils } from '../lib/utils'
import { RouteUtils } from './lib/routeutils'
import { reattachBehavior } from '../lib/attach'

const Triggers = {
  setupPage() {
    Meteor.setTimeout(() => {
      Utils.setScrollPosition();
      Utils.setTitleAndMeta();
      reattachBehavior();
    }, 300);
  },
  checkForNewPosts: () => Meteor.call("checkTumblr"),
  set404StatusCode: () => Spiderable.httpStatusCode = 404
};

FlowRouter.triggers.enter([Triggers.setupPage]);

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
  action() {
    if (Meteor.isClient)
      renderPage(RouteUtils.getTemplate("home"));
  },
  subscriptions() {
    const englishOnly = Meteor.isClient &&
                        Utils.getSiteVersion() === "en";
    this.register("postsWithAuthors",
      Meteor.subscribe("postsWithAuthors", englishOnly));
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
blogOverview.route("/tagged/:tag/page/:pageNum",{
  name: "blog",
  action() { renderPage("blog"); },
  subscriptions(params) {
    const tag = params.tag;
    const pageNum = params.pageNum;
    this.register("tagPosts", Meteor.subscribe("blogpostIndex", pageNum, tag));
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
  triggersExit: [() => {
    // remove the portfolio item bg color
    $("body").css("borderColor", "#84bc2d");
    $("#header, .container").css("backgroundColor", "");
  }],
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
FlowRouter.route("/:page", {
  name: "page",
  action(params) {
    if (Meteor.isClient)
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
