Template.micrioButton.events
  "click #micrio-button": ->
    Session.set("backgroundsVisible", no)
    $("#micrio").removeClass "hidden"

Template.micrio.helpers
  hidden: -> if Session.equals("backgroundsVisible", yes) then "hidden" else ""

Template.micrio.onCreated -> @subscribe "micrio"

Template.micrio.onRendered ->
  micrioEl = document.getElementById('micrio')
  Tracker.autorun ->
    new Screensaver(micrioEl, _.shuffle Micrios.find().fetch()).goto 0
