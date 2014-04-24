Template.body.rendered = ->
  reattachBehavior()
  FastClick.attach document.body

Template.body.events
  "click a[href^='/']": (evt) ->
    href = evt.target.getAttribute("href")
    return if not href or _.contains(href, ".")
    Router.go(href)
    window.scrollTo(0,0)
    evt.preventDefault()
    return false

Template.body.isPhantom = -> isPhantom