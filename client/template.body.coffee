Template.body.rendered = ->
  $("#og-title").attr "content", document.title
  
  reattachBehavior()
  updateLightbar()

Template.body.events
  "click a[href^='/']": (evt) ->
    href = evt.target.getAttribute("href")
    return if not href or _.contains(href, ".")
    Router.go(href)
    window.scrollTo(0,0)
    evt.preventDefault()
    return false

Template.body.isPhantom = -> isPhantom
Template.body.defaultNav = ->
  page = Session.get("page") or "home"
  page isnt "home"
