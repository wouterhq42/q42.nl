templateHeaderEvents =
  "click #mobile-menu-icon": (evt) ->
    $("body").toggleClass "show-mobile-menu"
  "click ul li a": ->
    $("body").removeClass "show-mobile-menu"

Template.en_header.events templateHeaderEvents
Template.header.events templateHeaderEvents