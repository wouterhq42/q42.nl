templateHeaderEvents =
  "click #mobile-menu-icon": (evt) -> $("body").toggleClass "show-mobile-menu"
  "focus li a":                    -> $("body").addClass "show-mobile-menu"
  "click li a":                    -> $("body").removeClass "show-mobile-menu"

  "click #lights-color": ->
    if not Session.get("supportsInputTypeColor")
      $(document.body).toggleClass("show-colorpicker")

  "input #lights-color": (evt) ->
    color = $(evt.target).val().replace("#", "")
    if color
      $.get "http://huelandsspoor.nl/api/lamps/setcolor?color=#{color}", ->
        $.get("/updateLightbar")
        $(evt.target).attr("value", "#" + color).css("background-color", "#" + color)
        Session.set("lightsColor", "#" + color)

$Template
  header:
    events: templateHeaderEvents
