Template.body.rendered = ->
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

  "click #lights-color": ->
    if not Session.get("supportsInputTypeColor")
      $(document.body).toggleClass("show-colorpicker")

  "input #lights-color": (evt) ->
    color = $(evt.target).val().replace("#", "")
    if color
      $.get "http://huelandsspoor.nl/api/lamps/setcolor?color=#{color}", ->
        $.get("/updateLightbar")
        $(evt.target).attr("value", "#" + color).css("background-color", "#" + color)
        Session.set("lightsColor", "#" + color)
        updateLightbar()

Template.body.supportsInputTypeColor = -> Session.equals("supportsInputTypeColor", yes)
Template.body.isPhantom = -> isPhantom
Template.body.defaultNav = ->
  page = Session.get("page") or "home"
  page isnt "home"