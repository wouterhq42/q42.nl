Router.route "updateLightBar",
  where: "server"
  path: "/updateLightbar"
  action: ->
    console.log "Route: updateLightBar"
    @response.writeHead 200, "Access-Control-Allow-Origin": "http://huelandsspoor.nl"
    console.log "Received request from huelandsspoor. Updating..."
    updateLightbar()
    @response.end()
