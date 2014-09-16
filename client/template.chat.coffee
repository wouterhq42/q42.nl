
Meteor.startup ->
	Meteor.subscribe "chat"

Template.chat.message = -> ChatMessages.find()
Template.chat.user = -> Meteor.users.findOne(@userId)?.profile.name or "onbekend"

Template.chat.events
	"click button": (evt) ->
		return unless Meteor.user()

		msg = $(Template.instance().find("input")).val()

		Meteor.call "addChatMessage", msg, Meteor.userId(), window.location.href