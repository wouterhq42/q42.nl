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



Template._project.project = ->
  project = Content.findOne()

done = no
Template.editable.events
  "input": (evt) ->
    unless done
      evt.preventDefault()
      done = yes
      return false

    $el = $(evt.target)
    return unless $el

    value = $el.html()
    field = $el.attr("data-field")
    id = $el.attr("data-id")
    changeObj = {}
    changeObj[field] = value
    Content.update id, $set: changeObj

    return false

Template._project.sizeEquals = (size1, size2) -> size1 is size2