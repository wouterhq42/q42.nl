
Meteor.startup ->
	Meteor.subscribe "chat"

Template.chat.helpers
	message: -> ChatMessages.find()
	user: -> Meteor.users.findOne(@userId)?.profile.name or "onbekend"

sendChatMessage = ->
	return unless Meteor.user()

	$input = $(Template.instance().find("input"))
	msg = $input.val()

	ChatMessages.insert userId: Meteor.userId(), msg: msg, date: new Date(), path: window.location.href

	$input.val("")
	$input.focus()

Template.chat.events
	"click button": -> sendChatMessage()
	"keyup input": (evt) -> if evt.which is 13 then sendChatMessage()

Template.chat.rendered = ->
	$input = $(Template.instance().find("input"))
	$input.focus()