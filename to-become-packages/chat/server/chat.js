ChatConfig = new Mongo.Collection("chatconfig");

Meteor.publish("chat", () => {
  return ChatMessages.find({}, {
    sort: { date: -1 },
    limit: 20
  });
});

Meteor.methods({
  setupChatConfig(incomingToken, outgoingToken) {
    /*
      - Incoming token is found on the incoming webhook page under
      "Integration Settings" -> "Webhook URL" -> fragment after last /

      - Outgoing token is found on the outgoing webhook page under
      "Integration Settings" -> "Token"
    */
    if (incomingToken && outgoingToken) {
      ChatConfig.remove({});
      ChatConfig.insert({
        incomingToken: incomingToken,
        outgoingToken: outgoingToken
      });
    }
  },

  setupChatDefaults(lang) {
    let user = Meteor.users.findOne(this.userId);
    if (!user.isAdmin) return;
    ChatMessages.remove({});
    ChatMessages.insert({
      userId: this.userId,
      msg: lang === "nl" ? "Hoi! Alles goed?" : "Hello! How are you?",
      date: new Date(),
      path: null
    });
  }
});

ChatMessages.allow({
  insert(userId, doc) {
    check(userId, String);
    check(doc.msg, String);

    const chatConfig = ChatConfig.findOne();

    const token = chatConfig.incomingToken;
    if (!token) return;

    const path = doc.path;
    const url = `https://q42.slack.com/services/hooks/incoming-webhook?token=${token}`;
    const pathWithoutHttp = path.replace("http://", "");
    const user = Meteor.users.findOne(userId);
    let res;

    try {
      res = HTTP.post(url, {
        params: {
          payload: JSON.stringify({
            text: [
              `${user.profile.name} (<${path}|${pathWithoutHttp}>) zegt:`,
              doc.msg
            ].join("\n"),
            icon_emoji: ":earth_africa:"
          })
        }
      });
    }
    catch(e) {
      return false;
    }

    return (res && res.content === 'ok');
  }
});

Picker.route("/api/chat", (params, req, res, next) => {
  console.log("Route: /api/chat");
  console.log("request.body:", JSON.stringify(req.body));
  const chatConfig = ChatConfig.findOne();
  const body = req.body;
  if (!req.body) return;
  if (req.body.token !== chatConfig.outgoingToken) return;

  const msg = req.body.text.replace("@q42nl ", "").replace("@q42com ", "");
  const user = req.body.user_name + " (Q42)";
  ChatMessages.insert({
    userId: null,
    username: user,
    msg: msg,
    date: new Date(),
    path: "/api/chat"
  });
  res.end();
});
