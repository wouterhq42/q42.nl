if Meteor.isClient

  Router.configure
    layoutTemplate: "body"
    notFoundTemplate: "error404"

  Router.load ->
    [page, subpage] = window.location.href.replace(/http(s?):\/\//, "").split("/").slice(1)
    page = subpage if subpage
    page = page.split("#")[0].split("?")[0] if page
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
      action: ->
        lang = Session.get "lang"
        @render (if lang is "en" then "en_home" else "home")

    @route "blog",
      path: "/blog/:page?/:pageNumOrTagName?"
      waitOn: ->
        [
          Meteor.subscribe("blogpostIndex", @params.pageNumOrTagName * 1, @params.pageNumOrTagName)
          Meteor.subscribe("pagesByTag", @params.pageNumOrTagName or "")
        ]
      data: ->
        if @params.page is null and not @params.page in ["page", "tagged"]
          NProgress.done()
          return null

        posts = blogpostIndex.find {}, sort: date: -1
        if posts.count() > 0 then Meteor.call "checkTumblr"

        item = PageCounts.findOne tag: Session.get("blogtag") or ""
        pages = if item then item.count else 1
        items = []
        if pages isnt 1
          page = @params.pageNumOrTagName*1 or 1
          if page > 1
            items.push label: "nieuwer", page: page - 1

          min = Math.max 1, page - 3
          max = Math.min pages, page + 3

          for i in [min..max]
            items.push label: i, page: i, active: i is page

          if page < pages
            items.push label: "ouder", page: page + 1

        return post: posts, pagination: items

    @route "blogpost",
      path: "/blog/post/:id/:title"
      waitOn: -> Meteor.subscribe "blogpostFull", @params.id * 1
      data: -> post: blogpostFull.findOne()

    @route "page",
      path: "/:page"
      before: -> Session.set "page", @params.page
      action: ->
        lang = Session.get "lang"
        @render (if lang is "en" then "en_" + @params.page else @params.page)

if Meteor.isServer

  Router.map ->
    @route "removeWWW",
      path: "*"
      action: ->
        console.log "Route: removeWWW"
        host = @request.headers.host
        fullUrl = "http://#{host}#{@request.url}"

        if host.indexOf("www") is 0
          @response.writeHead 301, Location: fullUrl.replace("www.", "")

    @route "updateLightBar",
      path: "/updateLightbar"
      action: ->
        console.log "Route: updateLightBar"
        @response.writeHead 200, "Access-Control-Allow-Origin": "http://huelandsspoor.nl"
        console.log "Received request from huelandsspoor. Updating..."
        updateLightbar()
