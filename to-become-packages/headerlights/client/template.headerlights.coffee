Template.headerlights.onCreated ->
  @toggleLights = new ReactiveVar false
  @lightsColor = new ReactiveVar Lights.findOne()?.hex or "#8cd600"
  @supportsInputTypeColor = (->
    # http://stackoverflow.com/a/8278718/16308
    i = document.createElement "input"
    i.setAttribute "type", "color"
    i.type isnt "text"
  )()

Template.headerlights.events
  "click #lights-color": (evt, tmpl) ->
    if not tmpl.supportsInputTypeColor
      $(document.body).toggleClass("show-colorpicker")

  "input #lights-color": (evt, tmpl) ->
    color = $(evt.target).val().replace("#", "")
    return unless color
    $.get "http://huelandsspoor.nl/api/lamps/setcolor?color=#{color}", ->
      $.get("/updateLightbar")
      $(evt.target)
        .attr("value", "#" + color)
        .css("background-color", "#" + color)
      tmpl.lightsColor.set "#" + color

Template.headerlights.helpers
  lightsColor: -> Template.instance().lightsColor.get()
  supportsInputTypeColor: -> Template.instance().supportsInputTypeColor is yes
  explanation: ->
    if Session.equals("lang", "en")
      "en_explanation"
    else
      "explanation"

getColor2FromHex = (hex) ->
  num = parseInt(hex, 16)
  r = num >> 16
  g = num & 0x0000ff
  b = (num >> 8) & 0x00ff

  r1 = r * .5
  g1 = g
  b1 = b * .3

  String("000000" + (g1 | (b1 << 8) | (r1 << 16)).toString(16)).slice(-6)

Template.backgrounds.helpers
  color: -> Lights.find({}, {sort: {date: 1}})
  col1: -> @hex
  col2: -> getColor2FromHex @hex
