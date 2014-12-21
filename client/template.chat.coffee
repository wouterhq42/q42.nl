
Meteor.startup ->
  Meteor.subscribe "chat"
  Session.setDefault "openChat", no

$Template
  chat:
    message: -> ChatMessages.find({}, {sort: date: 1})
    user: -> Meteor.users.findOne(@userId)?.profile.name or @username or "Unknown"

ChatMessages.after.insert ->
  $("#chat .flex-stretch").scrollTop(99999)

sendChatMessage = ->
  return unless Meteor.user()

  $input = $(Template.instance().find("input"))
  msg = $input.val()

  return unless msg

  ChatMessages.insert userId: Meteor.userId(), msg: msg, date: new Date(), path: window.location.href

  $input.val("")
  $input.focus()

events =
  "click .close": (evt) ->
    evt.preventDefault()
    Session.set("openChat", no)
  "click button": -> sendChatMessage()
  "keyup input": (evt) -> if evt.which is 13 then sendChatMessage()
Template.chat.events events
Template.en_chat?.events events

chatRendered = ->
  $input = $(Template.instance().find("input"))
  $input.focus()
Template.en_chat?.rendered = chatRendered
Template.chat.rendered = chatRendered
