$Template
  postDate:
    prettyDate: ->
      date = new Date(@date.replace(" GMT", "").split(" ").join("T") + "Z")
      "#{date.getDate()}/#{date.getMonth()+1}/#{date.getFullYear()}"
    authorName: -> @authorName or "Q42"

  otherPosts:
    post: ->
      blogpostIndex.find({
        id: $ne: FlowRouter.getParam('blogpostid')
        title: $exists: true
      }, limit: 3).fetch()
    firstImage: ->
      if @intro
        @intro.match(/<img src="(.*?)"/)?[1] or ""
      else if @link_image
        @link_image
      else
        ""

  latestComments:
    comment: ->
      LatestComments.find {}, sort: date: -1

Template.blogpost.helpers
  post: -> blogpostFull.findOne()

Template.blogposts.helpers
  post: -> blogpostIndex.find {}, sort: date: -1
  readmore: ->
    if Session.equals("lang", "en") then "Read more" else "Lees verder"

Template.pageNav.helpers
  pagination: -> Utils.getPagination(FlowRouter.getParam("pageNum") or 1)
  tag: -> FlowRouter.getParam("tag")
