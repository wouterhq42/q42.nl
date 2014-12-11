@customBlogPages = (route) ->

  customPageWithBlogTags = (obj) ->
    route obj.path,
      onBeforeAction: ->
        Session.set "page", obj.routeName
        @next()
      action: ->
        unless Session.equals("lang", obj.lang)
          Spiderable.httpStatusCode = 404
          @render "error404"
          return

        if @ready()
          @render Utils.getTemplate(obj.routeName)
        else
          @render "loading"
      onAfterAction: -> Meteor.call "checkTumblr"
      waitOn: ->
        [
          Meteor.subscribe "pagesByTag", obj.tags[0]
          SubsManager.subscribe "blogpostIndex", 1, obj.tags[0]
          SubsManager.subscribe "LatestComments", 10
        ]
      data: ->
        posts = blogpostIndex.find {}, sort: date: -1
        return null unless posts.count() > 0
        return {
          post:       posts
          pagination: Utils.getPagination 1
          tag:        obj.routeName
        }

    customPageWithBlogTags
      routeName: "meteor"
      path: "/meteor"
      tags: ["meteor"]
      lang: "en"

    customPageWithBlogTags
      routeName: "swift"
      path: "/swift"
      tags: ["swift"]
      lang: "en"

    customPageWithBlogTags
      routeName: "vacatures"
      path: "/vacatures"
      tags: ["vacature"]
      lang: "nl"

    customPageWithBlogTags
      routeName: "io"
      path: "/io"
      tags: ["io"]
      lang: "en"
