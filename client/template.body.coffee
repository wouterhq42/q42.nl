Template.body.rendered = ->
  if Session.equals("page", "home") or Session.equals("page", "") or Session.equals("page", undefined)
    document.title = "Q42"
  else
    document.title = $(this.find('h1')).text() + " - Q42"

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