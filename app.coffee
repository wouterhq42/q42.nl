if Meteor.isClient

  Router.configure
    layoutTemplate: "body"
    notFoundTemplate: "error404"

  Router.load ->
    [page, subpage] = @path.split("/").slice(1)
    page = subpage if subpage
    page = page.split("#")[0].split("?")[0] if page
    unless page
      page = ""
    Session.set "page", page

    NProgress.start()

  Router.before ->
    lang = Session.get "lang"
    @render (if lang is "en" then "en_header" else "header"), to: "header"
    @render (if lang is "en" then "en_footer" else "footer"), to: "footer"

  Router.after ->
    NProgress.done()

  Router.map ->

    @route "home",
      path: "/"
      action: -> @render (if Session.equals("lang", "en") then "en_home" else "home")

    @route "blog",
      path: "/blog"
      waitOn: ->
        [
          Meteor.subscribe "blogpostIndex", 1
          Meteor.subscribe "pagesByTag", ""
          Meteor.subscribe "LatestComments", 10
        ]
      data: ->
        Meteor.call "checkTumblr"
        posts = blogpostIndex.find {}, sort: date: -1
        return null unless posts.count() > 0
        return {
          post:       posts
          pagination: getPagination 1
        }

    @route "blog",
      path: "/blog/page/:pageNum"
      waitOn: ->
        [
          Meteor.subscribe "blogpostIndex", @params.pageNum * 1
          Meteor.subscribe "pagesByTag", ""
          Meteor.subscribe "LatestComments", 10
        ]
      data: ->
        Meteor.call "checkTumblr"
        posts = blogpostIndex.find {}, sort: date: -1
        return null unless posts.count() > 0
        return {
          post:       posts
          pagination: getPagination @params.pageNum
        }

    @route "blog",
      path: "/blog/tagged/:tag"
      waitOn: ->
        [
          Meteor.subscribe "blogpostIndex", 1, @params.tag
          Meteor.subscribe "pagesByTag", @params.tag or ""
          Meteor.subscribe "LatestComments", 10
        ]
      data: ->
        Meteor.call "checkTumblr"
        posts = blogpostIndex.find {}, sort: date: -1
        return null unless posts.count() > 0
        return {
          post:       posts
          pagination: getPagination @params.pageNum
          tag:        @params.tag
        }

    @route "blogpost",
      path: "/blog/post/:id/:title"
      before: -> Session.set "blogpostid", @params.id * 1
      waitOn: -> [
        Meteor.subscribe "blogpostIndex", 1
        Meteor.subscribe "blogpostFull", @params.id * 1
        Meteor.subscribe "blogComments", @params.id * 1
        Meteor.subscribe "LatestComments", 10
      ]
      data: -> {
        post:           blogpostFull.findOne()
        comments:       BlogComments.find({}, sort: date: -1)
        commentsCount:  BlogComments.find().count()
        oneComment:     BlogComments.find().count() is 1
      }

    @route "page",
      path: "/:page"
      before: -> Session.set "page", @params.page
      action: -> @render (if Session.equals("lang", "en") then "en_" + @params.page else @params.page)
      data: ->
        # there should be a nicer way to do this...
        tmpl = (if Session.equals("lang", "en") then "en_" + @params.page else @params.page)
        return null unless Template[tmpl]
        [] # data() needs to return something

  getPagination = (pageNum, tag) ->
    pageNum = pageNum * 1
    item = PageCounts.findOne tag: (tag or "")
    pages = if item then item.count else 1
    lang = Session.get "lang"
    older = if lang is "en" then "older" else "ouder"
    newer = if lang is "en" then "ouder" else "nieuwer"
    items = []

    if pages isnt 1
      page = pageNum or 1
      if page > 1
        items.push label: newer, page: page - 1

      min = Math.max 1, page - 3
      max = Math.min pages, page + 3

      for i in [min..max]
        items.push label: i, page: i, active: i is page

      if page < pages
        items.push label: older, page: page + 1

    return items

if Meteor.isServer

  Router.map ->
    @route "updateLightBar",
      where: "server"
      path: "/updateLightbar"
      action: ->
        console.log "Route: updateLightBar"
        @response.writeHead 200, "Access-Control-Allow-Origin": "http://huelandsspoor.nl"
        console.log "Received request from huelandsspoor. Updating..."
        updateLightbar()

    @route "removeWWW",
      where: "server"
      path: "*"
      action: ->
        console.log "Route: removeWWW"
        host = @request.headers.host
        fullUrl = "http://#{host}#{@request.url}"

        if host.indexOf("www") is 0
          @response.writeHead 301, Location: fullUrl.replace("www.", "")

        @next()