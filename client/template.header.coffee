templateHeaderEvents =
  "click #mobile-menu-icon": (evt) -> $("body").toggleClass "show-mobile-menu"
  "focus li a":                    -> $("body").addClass "show-mobile-menu"
  "click li a":                    -> $("body").removeClass "show-mobile-menu"
  "click #toggle-lang":            ->
    if Session.equals "lang", "en"
      Session.set "lang", "nl"
    else
      Session.set "lang", "en"

  "click #chat-toggle": (evt) ->
    Session.set "openChat", not Session.get("openChat")

Template.header.events templateHeaderEvents
Template.en_header?.events templateHeaderEvents
