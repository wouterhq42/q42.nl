Meteor.publish "chat", ->
  ChatMessages.find {}, {
    sort: { date: -1 },
    limit: 20
  }

Meteor.methods
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

    token = Meteor.settings.slack?.incomingToken
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
      console.log "Route: /api/chat"
      console.log "request.body:", JSON.stringify(@request.body)
      return unless @request.body?.token is Meteor.settings.slack?.outgoingToken
      msg = @request.body.text.replace("@q42nl ", "").replace("@q42com ", "")
      user = @request.body.user_name + " (Q42)"
      ChatMessages.insert userId: null, username: user, msg: msg, date: new Date(), path: "/api/chat"
      @response.end()
