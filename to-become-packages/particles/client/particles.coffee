generateParticles = ->
  c = (n) -> _.random(n or 255)
  rc = (n,a) -> "rgba(#{c(n)},#{c(n)},#{c(n)},#{a})"
  windowWidth = $(window).width()
  documentHeight = $(document).height()
  numParticles = 200
  class Particle
    constructor: (num, dim, color, translate3d) ->
      @$el = $("<div/>").css
        width: "#{dim}px"
        height: "#{dim}px"
        backgroundColor: color
        transform: translate3d

  generateParticle = (i) ->
    delay = _.random(4)
    duration = _.random(10, 60)
    # animVal = "p#{i} #{duration}s #{delay}s ease-in-out infinite alternate"
    x = _.random -50, windowWidth
    y = _.random -50, documentHeight
    z = _.random -250, 250
    # dx = _.random 200, 500
    # dx = if Math.random() < 0.5 then dx else -dx
    # dy = _.random 50, 100
    # dy = if Math.random() < 0.5 then dy else -dy
    # dz = _.random 100, 2500
    # dz = if Math.random() < 0.5 then dz else -dz
    translate3d = (x, y, z) -> "translate3d(#{x}px, #{y}px, #{z}px)"
    # transform = (prefix, x, y, z, rot, op) -> "#{prefix}transform: #{translate3d(x, y, z)} rotateX(#{rot}deg); opacity: #{op}"
    # _.each ["-webkit-", "-moz-", "-ms-", "-o-", ""], (prefix) ->
    #   rule = "@#{prefix}keyframes p#{i} { from { #{transform(prefix, x, y, z, 0, 1)}} to { #{transform(prefix, x+dx, y+dy, z+dz, 180, 0)}} }"
    #   # use a try/catch here to ignore errors trying to insert eg. -moz- rules into chrome
    #   try document.styleSheets[0].insertRule rule, document.styleSheets[0].cssRules.length

    new Particle(i, _.random(50), rc(0, .5), translate3d(x, y, z)).$el

  $("#particles").append _(numParticles).times generateParticle

# $OnRendered "header", generateParticles
