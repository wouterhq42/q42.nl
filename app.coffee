if Meteor.isClient

  setScrollPosition = ->
    if window.location.hash
      $el = $(window.location.hash)
      if $el[0]
        Meteor.setTimeout (-> $el[0].scrollIntoView()), 100
      else
        Meteor.setTimeout (-> setScrollPosition()), 1000
    else
      window.scrollTo 0,0

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

    $(document.body).removeClass(c) for c in $(document.body)[0].classList when c?.indexOf("page-") is 0
    $(document.body).addClass "page-" + (if page then page else "home")

    NProgress.start()

  Router.before ->
    lang = Session.get "lang"
    @render (if lang is "en" then "en_header" else "header"), to: "header"
    @render (if lang is "en" then "en_footer" else "footer"), to: "footer"

  Router.after ->
    NProgress.done()
    setScrollPosition()

  Router.map ->

    @route "home",
      path: "/"
      action: -> @render (if Session.equals("lang", "en") then "en_home" else "home")

    @route "blog",
      loadingTemplate: "loading"
      path: "/blog"
      action: -> @render (if Session.equals("lang", "en") then "en_blog" else "blog")
      after: -> Meteor.call "checkTumblr"
      waitOn: ->
        [
          Meteor.subscribe "blogpostIndex", 1
          Meteor.subscribe "pagesByTag", ""
          Meteor.subscribe "LatestComments", 10
        ]
      data: ->
        posts = blogpostIndex.find {}, sort: date: -1
        return {
          post:       posts
          pagination: getPagination 1
        }

    @route "blog",
      loadingTemplate: "loading"
      path: "/blog/page/:pageNum"
      action: -> @render (if Session.equals("lang", "en") then "en_blog" else "blog")
      after: -> Meteor.call "checkTumblr"
      waitOn: ->
        [
          Meteor.subscribe "blogpostIndex", @params.pageNum * 1
          Meteor.subscribe "pagesByTag", ""
          Meteor.subscribe "LatestComments", 10
        ]
      data: ->
        posts = blogpostIndex.find {}, sort: date: -1
        return {
          post:       posts
          pagination: getPagination @params.pageNum
        }

    @route "blog",
      loadingTemplate: "loading"
      path: "/blog/tagged/:tag"
      action: -> @render (if Session.equals("lang", "en") then "en_blog" else "blog")
      after: -> Meteor.call "checkTumblr"
      waitOn: ->
        [
          Meteor.subscribe "blogpostIndex", 1, @params.tag
          Meteor.subscribe "pagesByTag", @params.tag or ""
          Meteor.subscribe "LatestComments", 10
        ]
      data: ->
        posts = blogpostIndex.find {}, sort: date: -1
        return null unless posts.count() > 0
        return {
          post:       posts
          pagination: getPagination @params.pageNum
          tag:        @params.tag
        }

    @route "blogpost",
      loadingTemplate: "loading"
      path: "/blog/post/:id?/:title?"
      before: -> Session.set "blogpostid", @params.id * 1
      action: -> @render (if Session.equals("lang", "en") then "en_blogpost" else "blogpost")
      waitOn: -> [
        Meteor.subscribe "blogpostIndex", 1
        Meteor.subscribe "blogpostFull", @params.id * 1
        Meteor.subscribe "blogComments", @params.id * 1
        Meteor.subscribe "LatestComments", 10
      ]
      data: ->
        return null unless blogpostFull.findOne()
        return {
          post:           blogpostFull.findOne()
          comments:       BlogComments.find({}, sort: date: -1)
          commentsCount:  BlogComments.find().count()
          oneComment:     BlogComments.find().count() is 1
        }

    @route "page",
      path: "/:page"
      before: -> Session.set "page", @params.page
      action: ->
        if Session.equals("lang", "en")
          template = Template["en_" + @params.page]
          if template
            return @render "en_" + @params.page

        @render @params.page
      data: ->
        # there should be a nicer way to do this...
        template = Template[@params.page]

        # fallback to dutch if no english version present
        if Session.equals("lang", "en")
          template = Template["en_" + @params.page]
          unless template
            template = Template[@params.page]

        return null unless template

        return [] # data() needs to return something

  getPagination = (pageNum, tag) ->
    pageNum = pageNum * 1
    item = PageCounts.findOne tag: (tag or "")
    pages = if item then item.count else 1
    lang = Session.get "lang"
    older = if lang is "en" then "older" else "ouder"
    newer = if lang is "en" then "newer" else "nieuwer"
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

    @route "redirect_adventures"
      where: "server"
      path: "/adventures"
      action: ->
        @response.writeHead 302, Location: "http://q42.com/adventures"