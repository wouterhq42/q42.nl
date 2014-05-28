Router.map ->
  @route "updateLightBar",
    where: "server"
    path: "/updateLightbar"
    action: ->
      console.log "Route: updateLightBar"
      @response.writeHead 200, "Access-Control-Allow-Origin": "http://huelandsspoor.nl"
      console.log "Received request from huelandsspoor. Updating..."
      updateLightbar()

  @route "redirectAdventures",
    where: "server"
    path: "/adventures"
    action: ->
      console.log "Route: redirectAdventures"
      @response.writeHead 302, Location: "http://adventures.handcraft.com"

  # Redirect ancient color blindness simulator links to our more recent SEE extension
  @route "colorBlindnessSimulator",
    where: "server"
    path: "/demos/colorblindnesssimulator"
    action: ->
      console.log "Route: colorBlindnessSimulator"
      @response.writeHead 302, Location: "https://chrome.google.com/webstore/detail/see/dkihcccbkkakkbpikjmpnbamkgbjfdcn"
  @route "contrastCheck",
    where: "server"
    path: "/demos/contrastcheck"
    action: ->
      console.log "Route: contrastCheck"
      @response.writeHead 302, Location: "https://chrome.google.com/webstore/detail/see/dkihcccbkkakkbpikjmpnbamkgbjfdcn"

  @route "removeWWW",
    where: "server"
    path: "*"
    action: ->
      console.log "Route: removeWWW (#{@request.url})"
      host = @request.headers.host
      fullUrl = "http://#{host}#{@request.url}"

      if host.indexOf("www") is 0
        @response.writeHead 301, Location: fullUrl.replace("www.", "")

      @next()
