Template.comments.helpers
  picture: -> Utils.getPictureURL Meteor.user()

# all of these events relate to comments, so only on NL site
Template.comments.events
  "click #addComment": ->
    comm = $("#comment")[0].value
    if comm then Meteor.call "addComment", Session.get("blogpostid"), comm
    $("#comment")[0].value = ""

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
  picture: -> Utils.getPictureURL Meteor.users.findOne(_id: @userId)
  ownsComment: ->
    Meteor.userId() is @userId or Meteor.user() and Meteor.user().isAdmin
  datediff: ->
    date = new Date @date
    "#{date.getDate()}/#{date.getMonth()+1}/#{date.getFullYear()}"
  textAsHTML: ->
    @text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")
  editing: -> Template.instance().editing.get()
  numRows: -> Template.instance().numRows.get()

Template.comment.events
  "click .edit-comment": (evt, tmpl) -> tmpl.editing.set yes

  "click .save-comment": (evt, tmpl) ->
    tmpl.editing.set no
    Meteor.call "updateComment", @_id, tmpl.$(".edit-area")[0].value

  "click .delete-comment": (evt) -> Meteor.call "deleteComment", @_id

  "keyup textarea": (evt, tmpl) ->
    tmpl.numRows.set evt.target.value.replace(/[^\n]/g, '').length + 2
