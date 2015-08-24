@blogpostFull = new Mongo.Collection "blogpostFull"
@blogpostTitles = new Mongo.Collection "blogpostTitles"
@blogpostIndex = new Mongo.Collection "blogpostIndex"
@LatestComments = new Mongo.Collection "LatestComments"

Template.registerHelper "widthEquals", (width) -> @width is width
Template.registerHelper "typeIs", (type) -> @type is type
Template.registerHelper "isPhantom", -> /phantom/i.test navigator.userAgent

$Template
  blogpost:
    picture: -> getPictureURL Meteor.user()

  postDate:
    prettyDate: ->
      date = new Date(@date.replace(" GMT", "").split(" ").join("T") + "Z")
      "#{date.getDate()}/#{date.getMonth()+1}/#{date.getFullYear()}"
    authorName: -> @authorName or "Q42"

  otherPosts:
    post: ->
      blogpostIndex.find({
        id: {$ne: Session.get('blogpostid')},
        title: {$exists: true}
      }, {limit: 12}).fetch()

  latestComments:
    comment: ->
      LatestComments.find {}, sort: date: -1

Template.blogposts.helpers
  readmore: ->
    if Session.equals("lang", "en") then "Read more" else "Lees verder"


Template.comment.onCreated ->
  @editing = new ReactiveVar no
  @numRows = new ReactiveVar 3
  @date = new ReactiveVar(new Date)
  Meteor.setInterval (=> @date.set new Date()), 1000

# only on NL site
Template.comment.helpers
  service: ->
    user = Meteor.users.findOne _id: @userId
    return "" unless user
    p for p of user.services

  picture: -> getPictureURL Meteor.users.findOne(_id: @userId)

  ownsComment: ->
    Meteor.userId() is @userId or Meteor.user() and Meteor.user().isAdmin

  datediff: ->
    date = new Date @date
    "#{date.getDate()}/#{date.getMonth()+1}/#{date.getFullYear()}"

  textAsHTML: ->
    @text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")

  editing: -> Template.instance().editing.get()

  numRows: -> Template.instance().numRows.get()

# all of these events relate to comments, so only on NL site
Template.blogpost.events
  "click #addComment": ->
    comm = $("#comment")[0].value
    if comm then Meteor.call "addComment", Session.get("blogpostid"), comm
    $("#comment")[0].value = ""

Template.comment.events
  "click .edit-comment": (evt, tmpl) -> tmpl.editing.set yes

  "click .save-comment": (evt, tmpl) ->
    tmpl.editing.set no
    Meteor.call "updateComment", @_id, tmpl.$(".edit-area")[0].value

  "click .delete-comment": (evt) -> Meteor.call "deleteComment", @_id

  "keyup textarea": (evt, tmpl) ->
    tmpl.numRows.set evt.target.value.replace(/[^\n]/g, '').length + 2

syntaxHighlight = ->
  a = no
  $('code').each ->
    $parent = $(this).parent()
    if not $parent.hasClass("prettyprint") and $parent.is("pre")
      $parent.addClass("prettyprint")
      a = yes
  prettyPrint() if a

Template.blog.onRendered syntaxHighlight
Template.blogpost.onRendered syntaxHighlight
Template.en_blog?.onRendered syntaxHighlight
Template.en_blogpost?.onRendered syntaxHighlight

getPictureURL = (user) ->
  anon = "http://static.q42.nl/images/employees/anonymous.jpg"
  s = user.services
  switch
    when not user or not user.services then anon
    when s.twitter then s.twitter.profile_image_url
    when s.google then s.google.picture
    when s.facebook then "https://graph.facebook.com/#{s.facebook.id}/picture"
    when s.github then Gravatar.imageUrl(s.github.email or "")
    else anon
