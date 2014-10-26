ChatConfig = new Mongo.Collection("chatconfig")

Meteor.publish "chat", -> ChatMessages.find({}, {sort: {date: 1}, limit: 20})

Meteor.methods
  setupChatConfig: (incomingToken, outgoingToken) ->
    ChatConfig.insert incomingToken: incomingToken, outgoingToken: outgoingToken

ChatMessages.allow
  insert: (userId, doc) ->
    return no unless userId
    return no unless doc?.msg

    token = ChatConfig.findOne()?.incomingToken
    return no unless token

    path = doc.path
    url = "https://q42.slack.com/services/hooks/incoming-webhook?token=#{token}"
    pathWithoutHttp = path.replace("http://", "")
    user = Meteor.users.findOne(userId)

    try
      res = HTTP.post url, {
        params:
          payload: JSON.stringify(
            text: ["#{user.profile.name} (<#{path}|#{pathWithoutHttp}>) zegt:", doc.msg].join("\n")
            icon_emoji: ":earth_africa:"
          )
      }
    catch e
      return no

    if res?.content isnt 'ok' then no else yes

Router.map ->
  @route "chat",
    where: "server"
    path: "/api/chat"
    action: ->
      return unless @request.body.token? is ChatConfig.findOne()?.outgoingToken
      msg = @request.body.text.replace("@q42nl ", "").replace("@q42com ", "")
      user = @request.body.user_name
      ChatMessages.insert userId: null, username: user, msg: msg, date: new Date(), path: "/api/chat"