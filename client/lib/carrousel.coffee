class window.Carrousel

  constructor: ->
    @init()

  init: ->
    @carrousel  =  $('#carrousel')
    @indicators =  $("#indicators")
    @stage      =  $("#carrousel-stage")
    @shape      =  $("#carrousel-shape")

    @bindEvents()

  bindEvents: ->
    $(window).resize _.debounce(@resizeCarrousel.bind(this), 300)

    @carrousel.on "swipeleft", (evt) =>
      @setSwipeClass()
      @gotoNext()
    @carrousel.on "swiperight", (evt) =>
      @setSwipeClass()
      @gotoPrev()

    @carrousel.on "movestart", (evt) ->
      evt.preventDefault() if (e.distX > e.distY and e.distX < -e.distY) or (e.distX < e.distY and e.distX > -e.distY)

  render: ->
    @items = @carrousel.find ".item"
    @items.first().addClass "active-item"

    @deg = 360 / @items.length
    @z = @items.width() / 2 / Math.tan(@deg / 2 * Math.PI / 180)

    @resizeCarrousel()
    @drawIndicators()
    @setup3D()

    @shape.css
      "-webkit-transform": "rotateY(360deg)"
      "-moz-transform":    "rotateY(360deg)"

    @carrouselTimer = +new Date()
    requestAnimFrame => @nextItem()

    @q42IsTimer = +new Date()
    requestAnimFrame => @q42Is()

  drawIndicators: ->
    @indicators.html("")
    @items.each (i, item) =>
      $(item).attr "data-number", i
      @indicators.append "<span data-number=#{i}>●</span>"

    @indicators.find("span:first").addClass("active")
    @indicators.addClass "visible"
    @indicators.find("span").click (evt) =>
      @stage.addClass "transitioningByClick"
      @goto $(evt.target).attr("data-number")

  setup3D: ->
    unless @stage.hasClass "transitioning"
      @stage.removeClass "transition"
      @shape.removeClass "transition"

    deg = @deg
    z = @z

    @items.each (i) ->
      $(this).css
        "-webkit-transform": "rotateY(#{deg * i}deg) translateZ(#{z}px)"
        "-moz-transform": "rotateY(#{deg * i}deg) translateZ(#{z}px)"

    @stage.css
      "-webkit-transform": "translateZ(-#{z}px)"
      "-moz-transform": "translateZ(-#{z}px)"

    requestAnimFrame =>
      @stage.addClass "transition"
      @shape.addClass "transition"
          
  nextItem: ->
    requestAnimFrame => @nextItem()
    return if @paused
    return if +new Date() - @carrouselTimer < 8000
    @gotoNext()

  gotoNext: ->
    curr = @carrousel.find ".active-item"
    next = curr.next('.item')
    next = @carrousel.find(".item:first") unless next.length
    @goto next.attr("data-number")

  gotoPrev: ->
    curr = @carrousel.find ".active-item"
    prev = curr.prev('.item')
    prev = @carrousel.find(".item:last") unless prev.length
    @goto prev.attr("data-number")

  goto: (nr) ->
    curr = @carrousel.find ".active-item"
    next = @carrousel.find ".item[data-number='#{nr}']"
    currInd = @indicators.find ".active"
    nextInd = @indicators.find "span[data-number='#{nr}']"
    prevItemNr = +curr.attr("data-number")
    pos = 360 - @deg * nr
    pos = 0 if prevItemNr is @items.length - 1 and +nr is 0

    return if prevItemNr is nr

    @stage.addClass "transitioning"
    curr.removeClass "active-item"
    next.addClass "active-item"
    currInd.removeClass "active"
    nextInd.addClass "active"
      
    requestAnimFrame =>
      @shape.css
        "-webkit-transform": "rotateY(#{pos}deg)"
        "-moz-transform": "rotateY(#{pos}deg)"
      unless @stage.hasClass "transitioningBySwipe"
        @stage.css
          "-webkit-transform": "translateZ(-#{@z * 1.3}px)"
          "-moz-transform": "translateZ(-#{@z * 1.3}px)"

    @carrouselTimer = +new Date()
    requestAnimFrame => @zoomStageBackIn()

  zoomStageBackIn: ->
    delay = if @stage.hasClass("transitioningBySwipe") then 250 else 1250
    if +new Date() - @carrouselTimer < delay
      requestAnimFrame => @zoomStageBackIn()
      return

    @carrouselTimer = +new Date()
    requestAnimFrame => @afterTransition()

    swiping = false

    @stage.css
      "-webkit-transform": "translateZ(-#{@z}px)"
      "-moz-transform": "translateZ(-#{@z}px)"     

  afterTransition: ->
    delay = if @stage.hasClass("transitioningBySwipe") then 250 else 1250
    if +new Date() - @carrouselTimer < delay
      requestAnimFrame => @afterTransition()
      return

    @carrouselTimer = +new Date()

    @stage.removeClass "transitioning transitioningByClick transitioningBySwipe transitioningByDoubleSwipe"

  q42Is: ->
    requestAnimFrame => @q42Is()
    return if +new Date() - @q42IsTimer < 8000

    @q42IsTimer = +new Date()

    container = $("#q42is-container")
    curr = $("#q42is span.selected")
    next = curr.next()
    curr.removeClass "selected"
    next.delay(300).addClass "selected"
    container.append curr

  resizeCarrousel: ->
    max = Math.max $(window).height() - 150, $(window).width() / 2.5
    min = Math.min max, $(window).width()
    @carrousel.height min
    @setup3D()

  setSwipeClass: ->
    if @stage.hasClass "transitioningBySwipe"
      @stage.addClass "transitioningByDoubleSwipe"
    else
      @stage.addClass "transitioningBySwipe"