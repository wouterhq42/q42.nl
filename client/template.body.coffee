Template.body.onRendered ->
  reattachBehavior()

Template.body.events
  "click body": -> $("body").removeClass "show-mobile-menu"
  "click a[href^='/']": (evt) ->
    href = evt.target.getAttribute("href")
    if $(evt.target).data().ignore?
      evt.preventDefault()
      window.location.href = href

Template.body.helpers
	isPhantom: -> /phantom/i.test navigator.userAgent
