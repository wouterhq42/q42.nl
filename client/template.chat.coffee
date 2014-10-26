
Meteor.startup ->
  Meteor.subscribe "chat"

$Template
  chat:
    message: -> ChatMessages.find()
    user: -> Meteor.users.findOne(@userId)?.profile.name or "onbekend"

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

Template.en_chat.rendered = Template.chat.rendered = ->
  $input = $(Template.instance().find("input"))
  $input.focus()

  # OFFSCREEN_CLASS = 'off-screen'
  # TRANSITION_EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend'

  # hooks = 
  #   insertElement: (node, next) ->
  #     $(node).addClass(OFFSCREEN_CLASS).insertBefore(next)
  #     Tracker.afterFlush ->
  #       $(node).width() # force draw
  #       $(node).removeClass OFFSCREEN_CLASS
  #   removeElement: (node) ->
  #     $(node).addClass(OFFSCREEN_CLASS).on TRANSITION_EVENTS, -> $(node).remove()
  #   moveElement: (node, next) ->
  #     hooks.removeElement node
  #     hooks.insertElement node, next

  # $("#page")[0]._uihooks = hooks