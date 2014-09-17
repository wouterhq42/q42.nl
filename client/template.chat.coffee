
Meteor.startup ->
	Meteor.subscribe "chat"

Template.chat.message = -> ChatMessages.find()
Template.chat.user = -> Meteor.users.findOne(@userId)?.profile.name or "onbekend"

Template.chat.events
	"click button": (evt) ->
		return unless Meteor.user()

		$input = $(Template.instance().find("input"))
		msg = $input.val()

		Meteor.call "addChatMessage", msg, Meteor.userId(), window.location.href, ->
			$input.val("")
			$input.focus()

Template.chat.rendered = ->
	$input = $(Template.instance().find("input"))
	$input.focus()