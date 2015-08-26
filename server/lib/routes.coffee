HTTP_REDIRECT_TEMPORARY = 301
HTTP_REDIRECT_PERMANENT = 302
redirectNlToCom = (name, path) ->
  Picker.route path, (params, req, res, next) ->
    console.log "Route: #{path}", req.headers.host
    if req.headers.host is "q42.nl"
      res.writeHead HTTP_REDIRECT_PERMANENT, Location: "http://q42.com#{path}"
      res.end()
    else
      next()

redirectNlToCom "meteor", "/meteor"
redirectNlToCom "swift", "/swift"
redirectNlToCom "vr", "/vr"
redirectNlToCom "ixe", "/interaction-engineering"

Picker.route "/accessibility", (params, req, res, next) ->
  console.log "Route: redirectAccessibility"
  res.writeHead(
    HTTP_REDIRECT_PERMANENT,
    Location: "http://q42.com/interaction-engineering"
  )
  res.end()

Picker.route "/a11y", (params, req, res, next) ->
  console.log "Route: redirectA11y"
  res.writeHead(
    HTTP_REDIRECT_PERMANENT,
    Location: "http://q42.com/interaction-engineering"
  )
  res.end()

Picker.route "/adventures", (params, req, res, next) ->
  console.log "Route: redirectAdventures"
  res.writeHead(
    HTTP_REDIRECT_TEMPORARY,
    Location: "http://adventures.handcraft.com"
  )
  res.end()

# Redirect ancient color blindness simulator
# links to our more recent SEE extension
Picker.route "/demos/colorblindnesssimulator", (params, req, res, next) ->
  console.log "Route: colorBlindnessSimulator"
  res.writeHead(
    HTTP_REDIRECT_PERMANENT,
    Location: "https://chrome.google.com/webstore/" +
              "detail/see/dkihcccbkkakkbpikjmpnbamkgbjfdcn"
  )
  res.end()
Picker.route "/demos/contrastcheck", (params, req, res, next) ->
  console.log "Route: contrastCheck"
  res.writeHead(
    HTTP_REDIRECT_PERMANENT,
    Location: "https://chrome.google.com/webstore/" +
              "detail/see/dkihcccbkkakkbpikjmpnbamkgbjfdcn"
  )
  res.end()

Picker.route "*", (params, req, res, next) ->
  console.log "Route: removeWWW (#{req.url})"
  host = req.headers.host
  fullUrl = "http://#{host}#{req.url}"

  if host.indexOf("www") is 0
    res.writeHead HTTP_REDIRECT_PERMANENT, Location: fullUrl.replace("www.", "")
    res.end()
