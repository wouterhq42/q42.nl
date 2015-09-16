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
redirect = (from, to, status = HTTP_REDIRECT_PERMANENT) ->
  Picker.route from, (params, req, res, next) ->
    console.log "Route: redirect #{from}"
    res.writeHead status, Location: to
    res.end()

redirectNlToCom "meteor", "/meteor"
redirectNlToCom "swift", "/swift"
redirectNlToCom "vr", "/vr"
redirectNlToCom "ixe", "/interaction-engineering"

ixePage = "http://q42.com/interaction-engineering"
redirect "/accessibility", ixePage
redirect "/a11y", ixePage

redirect "/adventures",
         "http://adventures.handcraft.com",
         HTTP_REDIRECT_TEMPORARY

seeExtension = "https://chrome.google.com/webstore/" +
               "detail/see/dkihcccbkkakkbpikjmpnbamkgbjfdcn"
redirect "/demos/colorblindnesssimulator", seeExtension
redirect "/demos/contrastcheck", seeExtension

Picker.route "*", (params, req, res, next) ->
  console.log "Route: removeWWW (#{req.url})"
  host = req.headers.host
  fullUrl = "http://#{host}#{req.url}"

  if host.indexOf("www") is 0
    res.writeHead HTTP_REDIRECT_PERMANENT, Location: fullUrl.replace("www.", "")
    res.end()
