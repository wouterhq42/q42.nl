Meteor.startup ->
  Session.setDefault "employees_filter", "Q'er"
  SubsManager.subscribe "employees"

UI.registerHelper "avatar_static",   -> @imageStatic or @handle + ".jpg"
UI.registerHelper "avatar_animated", -> @imageAnimated or @handle + ".gif"

$Template
  employees:
    employee: ->
      filter = Session.get "employees_filter"
      if _.first(filter) is "/" and _.last(filter) is "/"
        try
          regex = new RegExp _.without(filter, "/").join(""), "i"
        catch error

        if regex
          return Employees.find($or: [{name: regex}, {phone: regex}, {handle: regex}, {web: regex}])

      else if filter isnt "" and filter isnt "Q'er"
        return Employees.find {labels: $in: [filter]}, sort: name: 1

      else
        return Employees.find {}, sort: name: 1

  employeeView:
    firstname: ->
      return "droid" unless @name
      @name.split(" ")[0]

    email: ->
      @email or @handle
    filter: -> Session.get("employees_filter")
    supportsWebm: ->
      video = document.createElement('video')
      video.canPlayType("video/webm") is "probably"

zIndex = 1000
polaroids = {}
mobileMaxWidth = 620

Polaroid = ($li) ->
  $polaroid = $li.find ".polaroid"

  rotatePolaroid = ->
    rotate = (Math.floor(Math.random() * 21) - 10)
    rotateValue = "translate(-30px, -30px) scale(1.0) rotateZ(#{rotate}deg)"
    _.each ["webkit", "moz", "ms", "o"], (type) ->
      $polaroid.css "-#{type}-transform", rotateValue
    $polaroid.css "transform", rotateValue

  initHover = (el) ->
    $li = $(el)
    $polaroidLists = $("#colleagues .polaroid").parent("li")
    $polaroidLists.removeClass "hover"
    windowWidth = $(window).width()
    if windowWidth > mobileMaxWidth
      $li.addClass "hover"

    $polaroid.css "z-index", ++zIndex

  show = (el) ->
    rotatePolaroid()
    initHover(el)
  hide = (el) ->
    $li = $(el)
    $li.removeClass "hover"

  {
    show: show
    hide: hide
  }

showPolaroid = (el) ->
  $li = $(el)
  name = $li.find(".color").attr("alt")
  polaroids[name] = polaroids[name] or new Polaroid($li)
  polaroids[name].show(el)

hidePolaroid = (el) ->
  $li = $(el)
  name = $li.find(".color").attr("alt")
  polaroids[name] = polaroids[name] or new Polaroid($li)
  polaroids[name].hide(el)

$Template
  employeeView:
    events:
      "mouseenter li": (evt) -> showPolaroid(evt.target)
      "click li":      (evt) -> showPolaroid(evt.target)
      "mouseleave li": (evt) -> hidePolaroid(evt.target)

Template.filter_employees.list = ->
  _.uniq(_.flatten(_.pluck(Employees.find().fetch(), "labels"))).sort()

Template.filter_employees.selected = (filter) ->
  if Session.equals("employees", filter) then "selected" else ""

Template.filter_employees.rendered = ->
  $("#filter-colleagues select").val(Session.get("employees_filter"))

Template.filter_employees.events
  "click li a": (evt) ->
    evt.preventDefault()
    val = $(evt.target).text()
    Session.set("employees_filter", val)
    false
  "keyup [data-role='filter-qers']": (evt) ->
    val = $(evt.target).val()
    Session.set("employees_filter", val)