@blogpostFull = new Mongo.Collection "blogpostFull"
@blogpostTitles = new Mongo.Collection "blogpostTitles"
@blogpostIndex = new Mongo.Collection "blogpostIndex"
@LatestComments = new Mongo.Collection "LatestComments"

Template.registerHelper "widthEquals", (width) -> @width is width
Template.registerHelper "typeIs", (type) -> @type is type

$Template

  blogpost:
    picture: -> getPictureURL Meteor.user()

  postDate:
    prettyDate: ->
      date = @date.replace(" GMT", "").split(" ").join("T") + "Z"
      moment(new Date(date)).format("dddd D MMMM YYYY")

  otherPosts:
    post: ->
      blogpostIndex.find({
        id: {$ne: Session.get('blogpostid')},
        title: {$exists: true}
      }, {limit: 12}).fetch()

  latestComments:
    comment: ->
      LatestComments.find {}, sort: date: -1

  comment:
    service: ->
      user = Meteor.users.findOne( _id: @userId)

      return "" unless user

      for p of user.services
        return p

    picture: ->
      getPictureURL Meteor.users.findOne(_id: @userId)

    ownsComment: ->
      Meteor.userId() is @userId or Meteor.user() and Meteor.user().isAdmin

    datediff: ->
      moment.duration(moment(Session.get("date")).diff(@date)).humanize()

    textAsHTML: ->
      @text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")

$Events "blogpost",
  "click #addComment": ->
    comm = $("#comment")[0].value
    if comm
      Meteor.call "addComment", Session.get("blogpostid"), comm
    $("#comment")[0].value = ""

  "click .edit-link": (evt) ->
    $comment = $(evt.target).closest "li"
    $comment.addClass "edit-mode"
    $comment.find(".edit-area").attr("rows", @text.replace(/[^\n]/g, '').length + 2)
    evt.preventDefault()

  "click .save-link": (evt) ->
    $comment = $(evt.target).closest "li"
    $comment.removeClass "edit-mode"
    Meteor.call "updateComment", @_id, $comment.find(".edit-area")[0].value
    evt.preventDefault()

  "click .delete-link": (evt) ->
    Meteor.call "deleteComment", @_id
    evt.preventDefault()

  "keyup textarea": (evt) ->
    evt.target.rows = evt.target.value.replace(/[^\n]/g, '').length + 2

syntaxHighlight = ->
  a = no
  $('code').each ->
    if not $(this).parent().hasClass("prettyprint") and $(this).parent().is("pre")
      $(this).parent().addClass("prettyprint")
      a = yes

  prettyPrint() if a

Template.blog.rendered = Template.blogpost.rendered = Template.en_blog?.rendered = Template.en_blogpost?.rendered = syntaxHighlight

getPictureURL = (user) ->
  anon = "http://static.q42.nl/images/employees/anonymous.jpg"
  if not user or not user.services
    return anon
  services = user.services
  if services.twitter  then return services.twitter.profile_image_url
  if services.google   then return services.google.picture
  if services.facebook then return "https://graph.facebook.com/#{services.facebook.id}/picture"
  if services.github   then return Gravatar.imageUrl(services.github.email or "")
  return anon
