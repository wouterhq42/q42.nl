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

    @resizeCarrousel()
    @drawIndicators()

    @carrouselTimer = +new Date()
    #requestAnimFrame => @nextItem()

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

    @deg = deg = 360 / @items.length
    @z = z = @items.width() / 2 / Math.tan(deg / 2 * Math.PI / 180)

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
    next = @carrousel.find(".active-item").next('.item')
    next = @carrousel.find(".item:first") unless next.length
    @goto next.attr("data-number")

  gotoPrev: ->
    prev = @carrousel.find(".active-item").prev('.item')
    prev = @carrousel.find(".item:last") unless prev.length
    @goto prev.attr("data-number")

  goto: (nr) ->
    $curr = @carrousel.find ".active-item"
    prevItemNr = +$curr.attr("data-number")
    pos = -@deg * nr
    pos = -360 if pos is 0 # ensures the right animation direction back to the starting point

    return if prevItemNr is nr

    @stage.addClass "transitioning"
    $curr.removeClass "active-item"
    @carrousel.find(".item[data-number='#{nr}']").addClass "active-item"
    @indicators.find(".active").removeClass "active"
    @indicators.find("span[data-number='#{nr}']").addClass "active"
      
    requestAnimFrame =>
      @shape.css
        "-webkit-transform": "rotateY(#{pos}deg)"
        "-moz-transform": "rotateY(#{pos}deg)"
      unless @stage.hasClass "transitioningBySwipe"
        @stage.css
          "-webkit-transform": "translateZ(-#{@z * 1.3}px)"
          "-moz-transform": "translateZ(-#{@z * 1.3}px)"

    @carrouselTimer = +new Date()
    requestAnimFrame => @finish()

  finish: ->
    delay = if @stage.hasClass("transitioningBySwipe") then 250 else 1250
    if +new Date() - @carrouselTimer < delay
      requestAnimFrame => @finish()
      return

    @carrouselTimer = +new Date()
    requestAnimFrame => @cleanup()

    @stage.css
      "-webkit-transform": "translateZ(-#{@z}px)"
      "-moz-transform": "translateZ(-#{@z}px)"     

  cleanup: ->
    delay = if @stage.hasClass("transitioningBySwipe") then 250 else 1250
    if +new Date() - @carrouselTimer < delay
      requestAnimFrame => @cleanup()
      return

    @carrouselTimer = +new Date()

    @stage.removeClass "transitioning transitioningByClick transitioningBySwipe transitioningByDoubleSwipe"

    # if we just rotated back to the first item in the carrousel,
    # the transform is set to -360deg and needs to be reset to 0
    # but if we do that, it will spin all the way around again
    # so to prevent that, we reset it while the transition class is disabled
    $curr = @carrousel.find ".active-item"
    currNr = +$curr.attr("data-number")
    if currNr is 0
      @shape.removeClass "transition"
      @shape.css
        "-webkit-transform": "rotateY(0deg)"
        "-moz-transform": "rotateY(0deg)"
      requestAnimFrame => @shape.addClass "transition"

  resizeCarrousel: ->
    max = Math.max $(window).height() - 150, $(window).width() / 2.5
    min = Math.min max, $(window).width()
    @carrousel.css height: min
    @setup3D()

  setSwipeClass: ->
    if @stage.hasClass "transitioningBySwipe"
      @stage.addClass "transitioningByDoubleSwipe"
    else
      @stage.addClass "transitioningBySwipe"

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