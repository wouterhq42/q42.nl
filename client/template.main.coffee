Template.main.helpers
  header: -> if Session.equals("lang", "en") then "en_header" else "header"
  footer: -> if Session.equals("lang", "en") then "en_footer" else "footer"
  openChat: -> Session.equals "openChat", yes
  chat: -> if Session.equals("lang", "en") then "en_chat" else "chat"
