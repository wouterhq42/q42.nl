Lights = new Meteor.Collection "lights"
NUM_LIGHTS = 29

@updateLightbar = ->
  lights = _.map Lights.find().fetch(), (doc) -> "#" + doc.hex
  lights = [
    lights[9]  or "#99ffcc" # area42 corner
    #lights[0]  or "#cc99ff" # stef's office
    lights[4]  or "#ff6666" # rijksmuseum team
    lights[23] or "#ccff99" # cynthia's desk
    lights[26] or "#99ccff" # hue team office
    lights[14] or "#99ccff" # kitchen
  ]

  diff = -80

  color = (Session.get("lightsColor") or lights[0]).replace("#", "")

  num = parseInt(color, 16)
  r = Math.max(0, Math.min(255, (num >> 16) + diff + 50))
  b = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + diff - 50))
  g = Math.max(0, Math.min(255, (num & 0x0000ff) + diff - 100))
  res = String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6)

  showBgNumber = if Session.equals("showBgNumber", 1) then 2 else 1
  $("#backgrounds").removeClass("showBg1 showBg2")
  $("#bg#{showBgNumber}").css "background-image",
    """radial-gradient(closest-corner,rgba(16,47,70,0) 60%,rgba(16,47,70,0.26)),
       linear-gradient(108deg,##{res},##{color} 90%)"""

  Meteor.setTimeout ->
    $("#backgrounds").addClass "showBg#{showBgNumber}"
    Session.set("showBgNumber", showBgNumber)
  , 100

Meteor.startup ->
  Deps.autorun ->
    Meteor.subscribe "lights"
    #updateLightbar()