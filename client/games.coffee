Template.qwerty.rendered = ->
  audio = $("#audio")[0]
  audio.volume = 0.2

Template.qwerty.events
  "click #toggleAudio": (evt) ->
    $("#toggleAudio i").toggleClass "icon-volume-up icon-volume-off"
    audio = $("#audio")[0]
    if audio.paused then audio.play() else audio.pause()