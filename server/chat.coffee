Meteor.publish "chat", -> ChatMessages.find({}, {sort: {date: -1}, limit: 20})

Meteor.methods
	"addChatMessage": (msg, userId, path) ->
		user = Meteor.users.findOne(userId)
		return unless user

		HTTP.post "https://slack.com/api/chat.postMessage", {
			params:
				token: SLACK_API_TOKEN
				channel: "#foobar"
				text: msg
				username: user.profile.name + " op " + path.replace("http://", "")
				icon_emoji: ":earth_oceania:"
		}, (err, res) ->
			return if err or not res?.data?.ok
			ChatMessages.insert userId: user._id, msg: msg, date: new Date()