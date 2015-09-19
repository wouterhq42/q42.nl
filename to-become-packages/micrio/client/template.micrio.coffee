Template.micrioButton.events
  "click #micrio-button": ->
    Session.set("backgroundsVisible", no)
    $("#micrio").removeClass "hidden"

Template.micrioButton.helpers
  explanation: ->
    if Session.equals("lang", "en")
      "en_micrioExplanation"
    else
      "micrioExplanation"

Template.micrio.helpers
  hidden: -> if Session.equals("backgroundsVisible", yes) then "hidden" else ""

Template.micrio.onCreated -> @subscribe "micrio"

Template.micrio.onRendered ->
  micrioEl = document.getElementById('micrio')
  new Screensaver(micrioEl, _.shuffle Micrios.find().fetch()).goto 0
