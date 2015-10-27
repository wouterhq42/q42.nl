Picker.route "/updateLightBar", (params, req, res, next) ->
  console.log "Route: updateLightBar"
  res.writeHead 200, {
    "Access-Control-Allow-Origin": "http://huelandsspoor.nl"
  }
  console.log "Received request from huelandsspoor. Updating..."
  updateLightbar()
  res.end()
