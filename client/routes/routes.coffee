Router.configure
  layoutTemplate: "main"
  loadingTemplate: "loading"
  notFoundTemplate: "error404"

Router.onRun ->
  @next()

Router.onBeforeAction ->
  SubsManager.subscribe "allUserData"
  @next()

Router.onAfterAction ->
  Utils.setScrollPosition()
  Meteor.setTimeout reattachBehavior, 0
  Meteor.setTimeout Utils.setTitleAndMeta, 0

Router.map ->

  # temp fix: waitOn seems to break spiderable
  @oldRoute = @route
  @route = (name, obj) =>
    if /phantom/i.test navigator.userAgent
      delete obj.waitOn
    @oldRoute(name, obj)

  @route "/",
    onBeforeAction: ->
      Session.set("page", "home")
      @next()
    action: -> @render Utils.getTemplate("home")
    waitOn: ->
      [
        Meteor.subscribe "employeeCount"
      ]

  @route "/blog",
    onBeforeAction: ->
      Session.set "page", "blog"
      @next()
    action: ->
      if @ready()
        @render Utils.getTemplate("blog")
      else
        @render "loading"
    onAfterAction: -> Meteor.call "checkTumblr"
    waitOn: ->
      [
        Meteor.subscribe "blogpostIndex", 1
        Meteor.subscribe "pagesByTag", ""
        SubsManager.subscribe "LatestComments", 10
      ]
    data: ->
      posts = blogpostIndex.find {}, sort: date: -1
      return {
        post:       posts
        pagination: Utils.getPagination 1
      }

  @route "/blog/page/:pageNum",
    onBeforeAction: ->
      Session.set "page", "blog"
      @next()
    action: ->
      if @ready()
        @render Utils.getTemplate("blog")
      else
        @render "loading"
    onAfterAction: -> Meteor.call "checkTumblr"
    waitOn: ->
      [
        Meteor.subscribe "blogpostIndex", @params.pageNum * 1
        SubsManager.subscribe "pagesByTag", ""
        SubsManager.subscribe "LatestComments", 10
      ]
    data: ->
      posts = blogpostIndex.find {}, sort: date: -1
      return {
        post:       posts
        pagination: Utils.getPagination @params.pageNum
      }

  @route "/blog/tagged/:tag",
    onBeforeAction: ->
      Session.set "page", "blog"
      @next()
    action: ->
      if @ready()
        @render Utils.getTemplate("blog")
      else
        @render "loading"
    onAfterAction: -> Meteor.call "checkTumblr"
    waitOn: ->
      [
        Meteor.subscribe "pagesByTag", @params.tag or ""
        SubsManager.subscribe "blogpostIndex", 1, @params.tag
        SubsManager.subscribe "LatestComments", 10
      ]
    data: ->
      posts = blogpostIndex.find {}, sort: date: -1
      return null unless posts.count() > 0
      return {
        post:       posts
        pagination: Utils.getPagination @params.pageNum
        tag:        @params.tag
      }

  @route "/blog/post/:id?/:title?",
    onBeforeAction: ->
      Session.set "page", "blog"
      Session.set "blogpostid", @params.id * 1
      @next()
    action: ->
      if @ready()
        if blogpostFull.findOne()
          @render Utils.getTemplate("blogpost")
        else
          @render "error404"
      else
        @render "loading"
    waitOn: -> [
      Meteor.subscribe "blogpostFull", @params.id * 1
      Meteor.subscribe "blogComments", @params.id * 1
      Meteor.subscribe "blogpostIndex", 1
      SubsManager.subscribe "LatestComments", 10
    ]
    data: ->
      return null unless blogpostFull.findOne()
      return {
        post:           blogpostFull.findOne()
        comments:       BlogComments.find({}, sort: date: -1)
        commentsCount:  BlogComments.find().count()
        oneComment:     BlogComments.find().count() is 1
      }

  ### custom pages go here ###

  customBlogPages this

  ### custom pages go here ###

  @route "/:page",
    onBeforeAction: ->
      Session.set "page", @params.page
      @next()
    waitOn: ->
      if @params.page in ["over-q42", "about-q42"]
        [
          SubsManager.subscribe("employees")
          SubsManager.subscribe("coffeeCounter")
          SubsManager.subscribe("toilets")
        ]
      else
        []
    action: ->
      if Session.equals("lang", "en") and Template["en_" + @params.page]
        @render "en_" + @params.page
      else if Session.equals("lang", "nl") and Template[@params.page]
        @render @params.page
      else
        Spiderable.httpStatusCode = 404
        @render "error404"

  @route "404",
    path: "/(.*)"
    template: "error404"
    onBeforeAction: ->
      Session.set "page", "404"
      Spiderable.httpStatusCode = 404
      @next()
