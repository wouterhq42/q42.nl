
Meteor.startup ->
  Meteor.subscribe "chat"
  Session.setDefault "openChat", no

ChatMessages.after.insert ->
  $("#chat .flex-stretch").scrollTop(99999)

sendChatMessage = ->
  return unless Meteor.user()

  $input = $(Template.instance().find("input"))
  msg = $input.val()

  return unless msg

  ChatMessages.insert
    userId: Meteor.userId(),
    msg: msg,
    date: new Date(),
    path: window.location.href

  $input.val("")
  $input.focus()

$Events "header",
  "click #chat-toggle": (evt) ->
    Session.set "openChat", not Session.get("openChat")

Template.chat.helpers
  message: -> ChatMessages.find({}, {sort: date: 1})
  user: ->
    Meteor.users.findOne(@userId)?.profile?.name or @username or "Unknown"

Template.chat.events
  "click .close": (evt) ->
    evt.preventDefault()
    Session.set("openChat", no)
  "click button": -> sendChatMessage()
  "keyup input": (evt) -> if evt.which is 13 then sendChatMessage()

Template.chat.onRendered ->
  $input = $(Template.instance().find("input"))
  $input.focus()
