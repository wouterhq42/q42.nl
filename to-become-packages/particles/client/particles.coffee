generateParticles = ->
  c = (n) -> ~~(Math.random() * (if n then n else 255))
  rc = (n,a) -> "rgba(#{c(n)},#{c(n)},#{c(n)},#{a})"
  rp = -> ~~((Math.random() * 2 - 1) * 250)
  windowWidth = $(window).width()
  types = ["-webkit-", "-moz-", "-ms-", "-o-", ""]
  numParticles = 42
  unzip = (array) ->
    result = Array(array[0].length)
    result[i] = _.pluck array, i for x, i in result
    result
  class Particle
    constructor: (num, dim, color, anim, translate3d) ->
      @$el = $("<div/>").addClass("particle").attr("id", "particle#{num}")
        .css "width", "#{dim}px"
        .css "height", "#{dim}px"
        .css "backgroundColor", color
        .css @getProps("animation", anim)
        .css @getProps("transform", translate3d)
    getProps: (name, value) ->
      _.object types.map((t) -> "#{t}#{name}"), Array.apply(null, Array(types.length)).map -> value

  generateParticle = (i) ->
    delay = ~~(Math.random() * 4) + "s"
    duration = _.random(10, 60) + "s"
    animVal = "float-particle#{i} #{duration} #{delay} ease-in-out infinite alternate"
    x = ~~((Math.random() * 2 - 1) * windowWidth)
    y = rp()
    z = rp()
    dx = _.random 200, 500
    dx = if Math.random() < 0.5 then dx else -dx
    dy = _.random 50, 100
    dy = if Math.random() < 0.5 then dy else -dy
    dz = _.random 100, 2500
    dz = if Math.random() < 0.5 then dz else -dz
    translate3d = (x, y, z) -> "translate3d(#{x}px, #{y}px, #{z}px)"
    transform = (type, x, y, z, rot, op) -> "#{type}transform: #{translate3d(x, y, z)} rotateX(#{rot}deg); opacity: #{op}"
    animDefs = types.map((type) ->
      "@#{type}keyframes float-particle#{i} { from { #{transform(type, x, y, z, 0, 1)}} to { #{transform(type, x+dx, y+dy, z+dz, 180, 0)}} }"
    ).join("\n")
    $p = new Particle(i, ~~(Math.random() * 750), rc(0, .5), animVal, translate3d(x, y, z)).$el

    [$p, animDefs]

  [particles, anims] = unzip _(numParticles).times((n) -> generateParticle n)

  $("#particles").append particles
  $("head").append $("<style/>").attr("type", "text/css").html anims.join("\n")

$OnRendered "header", generateParticles
