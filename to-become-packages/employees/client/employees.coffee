polaroidVisibility = new ReactiveDict

Meteor.startup ->
  Session.setDefault "employees_filter", "Q'er"

Template.registerHelper "avatar_static",   -> @imageStatic or @handle + ".jpg"
Template.registerHelper "avatar_animated", -> @imageAnimated or @handle + ".gif"

Template.employees.helpers
  employee: ->
    filter = Session.get "employees_filter"
    if _.first(filter) is "/" and _.last(filter) is "/"
      try
        regex = new RegExp _.without(filter, "/").join(""), "i"
      catch error

      if regex
        return Employees.find($or: [{name: regex}, {phone: regex}, {handle: regex}, {web: regex}])

    else if filter isnt "" and filter isnt "Q'er"
      return Employees.find labels: $in: [filter]

    else
      return Employees.find()
  filter: -> Session.get("employees_filter")

Template.en_employees?.helpers
  employee: -> Employees.find()




Template.employeeView.helpers
  firstname: ->
    return "droid" unless @name
    @name.split(" ")[0]
  email: -> @email or @handle

Template.employeeView.events
  "mouseenter .qer, click .qer": (evt) ->
    polaroidVisibility.set @_id, yes
    # Session.set "renderPolaroid#{@_id}", yes
  "mouseleave .qer": (evt) ->
    polaroidVisibility.set @_id, no
    # Session.set "renderPolaroid#{@_id}", no

Template.employeeView.helpers
  showPolaroid: -> polaroidVisibility.equals @_id, yes




Template.polaroid.onRendered ->
  @autorun =>
    unless polaroidVisibility.equals Template.currentData()._id
      $polaroid = @$(".polaroid")
      rotate = (Math.floor(Math.random() * 21) - 10)
      rotateValue = "translate(-30px, -30px) rotateZ(#{rotate}deg)"
      _.each ["webkit", "moz", "ms", "o"], (type) ->
        $polaroid.css "-#{type}-transform", rotateValue
      $polaroid.css "transform", rotateValue

      @find("video")?.play()

Template.polaroid.onDestroyed ->
  @find("video")?.pause()

Template.polaroid.helpers
  email: -> @email or @handle
  supportsWebm: ->
    video = document.createElement('video')
    video.canPlayType('video/webm; codecs="vp8, vorbis"') is "probably"

Template.polaroid.events
  "click .closePolaroid": (evt) ->
    polaroidVisibility.set Template.currentData()._id, no
    # prevent the mouseenter listener on employeeView from firing
    evt.stopPropagation()




Template.filter_employees.helpers
  list: -> _.uniq(_.flatten(_.pluck(Employees.find().fetch(), "labels"))).sort()
  selected: (filter) -> if Session.equals("employees_filter", filter) then "selected" else ""

# Dutch only
Template.filter_employees.events
  "click li a": (evt) ->
    evt.preventDefault()
    val = $(evt.target).text()
    Session.set("employees_filter", val)
    false
  "keyup [data-role='filter-qers']": (evt) ->
    val = $(evt.target).val()
    Session.set("employees_filter", val)
