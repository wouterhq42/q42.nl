@ChatConfig = new Mongo.Collection("chatconfig")

Meteor.publish "chat", ->
  ChatMessages.find {}, {
    sort: { date: -1 },
    limit: 20
  }

Meteor.methods
  setupChatConfig: (incomingToken, outgoingToken) ->
    ###
      - Incoming token is found on the incoming webhook page under
      "Integration Settings" -> "Webhook URL" -> fragment after last /

      - Outgoing token is found on the outgoing webhook page under
      "Integration Settings" -> "Token"
    ###
    if incomingToken and outgoingToken
      ChatConfig.remove({})
      ChatConfig.insert
        incomingToken: incomingToken
        outgoingToken: outgoingToken

  setupChatDefaults: (lang) ->
    return unless Meteor.users.findOne(@userId)?.isAdmin
    ChatMessages.remove({})
    ChatMessages.insert
      userId: @userId
      msg: if lang is "nl" then "Hoi! Alles goed?" else "Hello! How are you?"
      date: new Date()
      path: null

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
            text: [
              "#{user.profile.name} (<#{path}|#{pathWithoutHttp}>) zegt:"
              doc.msg
            ].join("\n")
            icon_emoji: ":earth_africa:"
          )
      }
    catch e
      return no

    if res?.content isnt 'ok' then no else yes

Picker.route "/api/chat", (params, req, res, next) ->
  console.log "Route: /api/chat"
  console.log "request.body:", JSON.stringify(req.body)
  return unless req.body?.token is ChatConfig.findOne()?.outgoingToken
  msg = req.body.text.replace("@q42nl ", "").replace("@q42com ", "")
  user = req.body.user_name + " (Q42)"
  ChatMessages.insert
    userId: null
    username: user
    msg: msg
    date: new Date()
    path: "/api/chat"
  res.end()
