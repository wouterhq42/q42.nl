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

$Events "headerlights", templateHeaderEvents

$Template
  headerlights:
    lightsColor: -> Session.get("lightsColor")
    supportsInputTypeColor: -> Session.equals("supportsInputTypeColor", yes)
