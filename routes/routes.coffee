Triggers =
  setupPage: ->
    Meteor.setTimeout (->
      Utils.setScrollPosition()
      Utils.setTitleAndMeta()
      reattachBehavior()
    ), 200
  checkForNewPosts: -> Meteor.call "checkTumblr"
  set404StatusCode: -> Spiderable.httpStatusCode = 404
  setLanguage: ->
    Session.set "lang",
      if window.location.hostname is "q42.com" then "nl" else "en"

FlowRouter.triggers.enter [Triggers.setLanguage, Triggers.setupPage]

renderPage = (templateName) ->
  BlazeLayout.render "main", {
    header: "header"
    footer: "footer"
    body: templateName
  }

if Meteor.isClient
  Template.registerHelper "subsReady", -> FlowRouter.subsReady()

# Homepage
FlowRouter.route "/",
  name: "home"
  action: -> renderPage RouteUtils.getTemplate("home")

blogOverview = FlowRouter.group
  prefix: "/blog"
  triggersEnter: [Triggers.checkForNewPosts]
  subscriptions: ->
    @register "comments", Meteor.subscribe "LatestComments", 10
  # XXX: move this into template helpers
  # since action is not reactive
  # if FlowRouter.subsReady()
  # else
  #   BlazeLayout.render "main", "loading"

# Blog overview
blogOverview.route "/",
  name: "blog"
  action: ->
    renderPage "blog"
  subscriptions: ->
    @register "allPosts", Meteor.subscribe("blogpostIndex", 1)
    @register "tags", Meteor.subscribe("pagesByTag", "")

# Blog paging
blogOverview.route "/page/:pageNum",
  name: "blog"
  action: ->
    renderPage "blog"
  subscriptions: (params) ->
    pageNum = parseInt params.pageNum
    @register "pagePosts", Meteor.subscribe("blogpostIndex", pageNum)
    @register "tags", Meteor.subscribe("pagesByTag", "")

# Posts matching a given tag
blogOverview.route "/tagged/:tag",
  name: "blog"
  action: ->
    renderPage "blog"
  subscriptions: (params) ->
    tag = params.tag
    @register "tagPosts", Meteor.subscribe("blogpostIndex", 1, tag)
    @register "tags", Meteor.subscribe("pagesByTag", tag or "")

# Actual blogpost
FlowRouter.route "/blog/post/:id/:title?",
  name: "blogpost"
  action: -> renderPage "blogpost"
  triggersEnter: [Triggers.checkForNewPosts]
  subscriptions: (params) ->
    id = parseInt params.id
    @register "blogpost", Meteor.subscribe("blogpostFull", id)
    @register "comments", Meteor.subscribe("blogComments", id)
    @register "allTitles", Meteor.subscribe("blogpostTitles", 1)

# custom blog pages matching a given tag
customBlogPages this


FlowRouter.route "/work/:slug",
  name: "work"
  action: (params) ->
    renderPage "workDetail"
  subscriptions: (params) ->
    @register "work", Meteor.subscribe("work", params.slug)

# Any other page
FlowRouter.route "/:page",
  name: "page"
  action: (params) ->
    renderPage RouteUtils.getTemplate(params.page)
  subscriptions: (params) ->
    if params.page in ["over-q42", "about-q42"]
      @register "employees", Meteor.subscribe("employees")
      @register "coffeeCounter", Meteor.subscribe("coffeeCounter")
      @register "toilets", Meteor.subscribe("toilets")

# not found
FlowRouter.route "/(.*)",
  name: "404"
  triggersEnter: [Triggers.set404StatusCode]
  action: ->
    renderPage "error404"
