Template.body.rendered = ->
  reattachBehavior()
  FastClick.attach document.body

Template.body.events
  "click a[href^='/']": (evt) ->
    href = evt.target.getAttribute("href")
    if $(evt.target).data().ignore?
      evt.preventDefault()
      window.location.href = href

Template.body.isPhantom = -> /phantom/i.test navigator.userAgent



Template.block.block = (id) -> Content.findOne(id: id, lang: Session.get("lang"))
Template.block.sizeEquals = (size1, size2) -> size1 is size2

Template.content.content = (id) -> Content.findOne(id: id, lang: Session.get("lang"))

Template.editable.events
  "input": (evt) ->
    $el = $(evt.target)
    return unless $el

    value = $el.html()
    field = $el.attr("data-field")
    id = $el.attr("data-id")

    Meteor.call "updateContent", id, field, value

    return false