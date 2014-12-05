templateHeaderEvents =
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

Template.header.events templateHeaderEvents
Template.en_header?.events templateHeaderEvents
