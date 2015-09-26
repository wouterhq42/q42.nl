HTTP_REDIRECT_TEMPORARY = 301
HTTP_REDIRECT_PERMANENT = 302

# Use Picker middleware to handle server-side routes
# per https://github.com/meteorhacks/picker/issues/22

Picker.middleware (req, res, next) ->
  urlsToRedirectToEn = ["/meteor", "/swift", "/vr", "/interaction-engineering"]
  if req.headers.host is "q42.nl"
    if req.url in urlsToRedirectToEn
      console.log "Redirect NL to EN: #{req.url}"
      res.writeHead HTTP_REDIRECT_PERMANENT,
        Location: "http://q42.com#{req.url}"
      res.end()
  else
    next()

Picker.middleware (req, res, next) ->
  if req.url in ["/accessibility", "/a11y"]
    res.writeHead HTTP_REDIRECT_PERMANENT,
      Location: "http://q42.com/interaction-engineering"
    res.end()

  else if req.url is "/adventures"
    res.writeHead HTTP_REDIRECT_TEMPORARY,
      Location: "http://adventures.handcraft.com"
    res.end()

  # SEE extension
  else if req.url in ["/demos/colorblindnesssimulator", "/demos/contrastcheck"]
    res.writeHead HTTP_REDIRECT_PERMANENT,
      Location: "https://chrome.google.com/webstore/"+
                "detail/see/dkihcccbkkakkbpikjmpnbamkgbjfdcn"
    res.end()

  else
    next()

Picker.middleware (req, res, next) ->
  host = req.headers.host
  fullUrl = "http://#{host}#{req.url}"
  if host.indexOf("www") is 0
    console.log "Route: removeWWW (#{req.url})"
    res.writeHead HTTP_REDIRECT_PERMANENT, Location: fullUrl.replace("www.", "")
    res.end()
  else
    next()
