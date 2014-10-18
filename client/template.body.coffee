Template.body.rendered = ->
  reattachBehavior()
  FastClick.attach document.body

Template.body.events
  "click a[href^='/']": (evt) ->
    href = evt.target.getAttribute("href")
    if $(evt.target).data().ignore?
      evt.preventDefault()
      window.location.href = href

Template.body.helpers
	isPhantom: -> /phantom/i.test navigator.userAgent

Template.main.helpers
	openChat: -> Session.equals "openChat", yes