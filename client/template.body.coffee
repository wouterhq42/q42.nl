Template.body.rendered = ->
  reattachBehavior()
  FastClick.attach document.body

Template.body.events
  "click a[href^='/']": (evt) ->
    href = evt.target.getAttribute("href")
    if $(evt.target).data().ignore?
      evt.preventDefault()
      window.location.href = href

Template.body.isPhantom = -> isPhantom