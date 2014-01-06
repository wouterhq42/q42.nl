Template.body.rendered = ->
  if not Session.equals("page", "") and not Session.equals("page", undefined) and not Session.equals("page", "home")
    document.title = $(this.find('h1')).text() + " - Q42"
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