headerRendered = ->
  c = (n) -> ~~(Math.random() * (if n then n else 255))
  rgba = (r,g,b,a) -> "rgba(#{r},#{g},#{b},#{a})"
  rc = (n,a) -> rgba(c(n), c(n), c(n), a)
  rp = -> ~~((Math.random() * 2 - 1) * 250)
  rr = -> ~~((Math.random() * 2 - 1) * 20)
  between = (a,b) -> Math.max(a, ~~(Math.random()*b))

  generateparticles = (numparticles) ->
    $particles = $(".particle")
    $("#particles").html("")
    _.times(numparticles, (n) -> generateparticle(n))
    $("head").append($style)

  generateparticle = (i) ->
    $particle = $("<div/>")
    $particle.addClass("particle")
    $particle.attr("id", "particle#{i}")

    delay = ~~(Math.random() * 4) + "s"
    duration = between(10, 60) + "s"
    animationValue = "float-particle#{i} #{duration} #{delay} ease-in-out infinite alternate"
    types = ["webkit", "moz", "ms", "o"]

    _.each types, (type) -> $particle.css "-#{type}-animation", animationValue
    $particle.css "animation", animationValue

    dim = ~~(Math.random() * 150)
    $particle.css "width", "#{dim}px"
    $particle.css "height", "#{dim}px"

    color = rc 0, .8
    $particle.css "backgroundColor", color

    x = ~~((Math.random() * 2 - 1) * $(window).width())
    y = rp()
    z = -rp()

    transform = "translate3d(#{x}px, #{y}px, #{z}px)"
    _.each types, (type) -> $particle.css "-#{type}-transform", transform
    $particle.css "transform", transform

    $("#particles").append $particle

    dx = between 200, 500
    dx = if Math.random() < 0.5 then dx else -dx
    dy = between 200, 500
    dy = if Math.random() < 0.5 then dy else -dy
    dz = between 200, 500
    dz = if Math.random() < 0.5 then dz else -dz

    anim = ""
    keyframes = ""
    from = "transform: translate3d(#{x}px, #{y}px, #{z}px); opacity: 1"
    to = "transform: translate3d(#{x+dx}px, #{y+dy}px, #{z+dz}px); opacity: 0"
    _.each types, (type) ->
      keyframes = "keyframes float-particle#{i} { from {-#{type}-#{from}} to {-#{type}-#{to}} }"
      anim += "\n@-#{type}-#{keyframes}"
    anim += "\n@keyframes float-particle#{i} { from {#{from}} to {#{to}} }"

    $style.html $style.html() + anim

  $style = $("<style/>")
  $style.attr "type", "text/css"
  $style.html("")

  numparticles = 42
  generateparticles numparticles


Template.header.rendered = headerRendered
Template.en_header?.rendered = headerRendered
