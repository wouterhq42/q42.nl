Q42Router = Backbone.Router.extend
  routes:
    "":                            "main"
    "blog":                        "blog"
    "blog/page/:page":             "blog"
    "blog/tagged/:tag":            "blogtagged"
    "blog/tagged/:tag/page/:page": "blogtagged"
    "blog/post/:id":               "blogpost"
    "blog/post/:id/":              "blogpost"
    "blog/post/:id/:slug":         "blogpost"
    "wootcamp":                    "wootcamp"
    ":page":                       "main"
    ":page/:subpage":              "main"

  main: (page, subpage) ->
    # forward to domain without www.prefix
    # fallback in case server-side redirect doesn't work for some reason
    if window.location.hostname.indexOf("www.") is 0
      window.location.href = window.location.href.replace "http://www.", "http://"
      return

    $(document.body).removeClass (item) -> item if /^page-.*/.test item
    _.each [page, subpage], (item) -> $(document.body).addClass "page-#{item}" if item

    page = subpage if subpage

    if page
      page = page.split("#")[0].split("?")[0]

    Session.set "page", page

    if page
      pageTitle = page[0].toUpperCase() + page.substring(1).replace("-", "")

      document.title = pageTitle or "Q42"
      if document.title isnt "Q42"
        document.title += " - Q42"

    @checkFragmentId()

  wootcamp: ->
    window.location.href = window.location.href.replace "wootcamp", "w00tcamp" 

  blog: (page, tag) ->
    Session.set "blogpage", 1 * page or 0
    Session.set "blogtag", tag or ""
    Session.set "blogpostid", -1
    @main "blog"

  blogpost: (id) ->
    Session.set "blogpostid", 1 * id
    @main "blogpost"

  blogtagged: (tag, page) ->
    @blog page, tag.replace(/[\-\+]/g, ' ')

  loadPage: (page) ->
    @navigate page, trigger: yes

  checkFragmentId: ->
    if window.location.hash
      $el = $(window.location.hash)
      if $el[0]
        Meteor.setTimeout ->
          $el[0].scrollIntoView()
        , 100
      else
        Meteor.setTimeout ->
          Router.checkFragmentId()
        , 1000

@Router = new Q42Router