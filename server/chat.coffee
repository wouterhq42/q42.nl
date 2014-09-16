Meteor.publish "chat", -> ChatMessages.find({}, {sort: {date: -1}, limit: 20})

Meteor.methods
	"addChatMessage": (msg, userId, path) ->
		user = Meteor.users.findOne(userId)
		return unless user

		SLACK_API_TOKEN = "xoxp-2151700812-2151700814-2664429501-6a7ca9"

		HTTP.post "https://slack.com/api/chat.postMessage", {
			params:
				token: SLACK_API_TOKEN
				channel: "#foobar"
				text: msg
				username: user.profile.name + " op " + path.replace("http://", "")
				icon_emoji: ":earth_africa:"
		}, (err, res) ->
			return if err or not res?.data?.ok
			ChatMessages.insert userId: user._id, msg: msg, date: new Date()