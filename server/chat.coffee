Meteor.publish "chat", -> ChatMessages.find({}, {sort: {date: 1}, limit: 20})

Meteor.methods
	"addChatMessage": (msg, userId, path) ->
		user = Meteor.users.findOne(userId)
		return unless user

		url = "https://q42.slack.com/services/hooks/incoming-webhook?token=#{SLACK_WEBHOOK_TOKEN}"
		pathWithoutHttp = path.replace("http://", "")

		HTTP.post url, {
			params:
				payload: JSON.stringify(
					text: ["#{user.profile.name} (<#{path}|#{pathWithoutHttp}>) zegt:", msg].join("\n")
					icon_emoji: ":earth_africa:"
				)
		}, (err, res) ->
			if err
				console.log err
			return if err or res?.content isnt 'ok'
			ChatMessages.insert userId: user._id, msg: msg, date: new Date()

Router.map ->
	@route "chat",
		where: "server"
		path: "/api/chat"
		action: ->
			return unless @request.body.token
			msg = @request.body.text.replace("@qsitebot ", "")
			user = @request.body.user_name
			ChatMessages.insert userId: null, username: user, msg: msg, date: new Date()