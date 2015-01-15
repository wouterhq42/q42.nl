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

  backgrounds:
    color: -> Lights.find({}, {sort: {date: 1}})
    col1: -> @hex
    col2: ->
      num = parseInt(@hex, 16)
      r = num >> 16
      g = num & 0x0000ff
      b = (num >> 8) & 0x00ff

      r1 = r * .5
      g1 = g
      b1 = b * .3

      String("000000" + (g1 | (b1 << 8) | (r1 << 16)).toString(16)).slice(-6)
