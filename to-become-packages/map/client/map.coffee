@initMap = ->
  navigator.geolocation.getCurrentPosition (geo) ->
    geocoder = new google.maps.Geocoder()
    latlng = new google.maps.LatLng geo.coords.latitude, geo.coords.longitude
    geocoder.geocode {latLng: latlng}, (res, status) ->
      if status is google.maps.GeocoderStatus.OK
        Session.set("currentGeo", res[0])
        
  styles = [{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]
  mapNL = new google.maps.Map $("#map-nl")[0], {
    center: new google.maps.LatLng(52.2298672,4.6431694)
    zoom: 9
    mapTypeControl: no
    streetViewControl: no
    styles: styles
  }
  mapUS = new google.maps.Map $("#map-us")[0], {
    center: new google.maps.LatLng(37.553001,-122.2672957)
    zoom: 9
    mapTypeControl: no
    streetViewControl: no
    styles: styles
  }
  directionsService = new google.maps.DirectionsService()
  directionsDisplayNL = new google.maps.DirectionsRenderer()
  directionsDisplayNL.setMap mapNL
  directionsDisplayUS = new google.maps.DirectionsRenderer()
  directionsDisplayUS.setMap mapUS

  setDirections = (nlUs, dest) ->
    return unless Session.get("currentGeo")
    request =
      origin: Session.get("currentGeo").formatted_address
      destination: new google.maps.LatLng dest.lat, dest.lng
      travelMode: google.maps.TravelMode.DRIVING
    directionsService.route request, (res, status) ->
      if status is google.maps.DirectionsStatus.OK
        if nlUs is "nl"
          directionsDisplayNL.setDirections res
        else
          directionsDisplayUS.setDirections res
      else if status is google.maps.GeocoderStatus.ZERO_RESULTS
        alert "Could not route to your location. :("
      else
        console.warn "Unknown error while trying to route.", status

  denHaag = if Session.equals("lang", "en") then "The Hague" else "Den Haag"
  tld = if Session.equals("lang", "en") then "com" else "nl"
  getDirections =
    if Session.equals("lang", "en")
      "Get directions (driving)"
    else
      "Toon routebeschrijving (met de auto)"

  markerTemplate =
    icon: {
      url: "http://static.q42.nl/images/q42-logo-map-marker.png"
      size: new google.maps.Size 32, 49
      origin: new google.maps.Point 0, 0
      anchor: new google.maps.Point 8, 25
      scaledSize: new google.maps.Size 16, 25
    }
    attribution:
      source: "Q42.#{tld}"
      webUrl: "http://q42.#{tld}"

  $("#maps").on "click", ".get-directions", ->
    id = $(this).attr("id").replace("to-", "")
    if id is "q020"
      setDirections "nl", {lat: 52.375273, lng: 4.930484}
    if id is "q070"
      setDirections "nl", {lat: 52.069291, lng: 4.323498}
    if id is "qsa"
      setDirections "us", {lat: 37.40915, lng: -122.075035}

  q020Marker = new google.maps.Marker _.extend markerTemplate, {
    title: "Q42 Amsterdam"
    place:
      placeId: 'ChIJHZ0iUg8JxkcRKOwjwMJmk4k'
      location: {lat: 52.375273, lng: 4.930484}
  }
  q020Marker.setMap mapNL
  q020InfoWindow = new google.maps.InfoWindow {
    maxWidth: 250
    content: """
      Q42 Amsterdam<br><br>
      #{$("#map-nl-qers").html()}<br><br>
      <span class="get-directions" id="to-q020">#{getDirections}</span>
    """
  }
  q020Marker.addListener "click", -> q020InfoWindow.open mapNL, q020Marker

  q070Marker = new google.maps.Marker _.extend markerTemplate, {
    title: "Q42 #{denHaag}"
    place:
      placeId: 'ChIJN5_o2-G2xUcR-H1qGRErYGk'
      location: {lat: 52.069291, lng: 4.323498}
  }
  q070Marker.setMap mapNL
  q070InfoWindow = new google.maps.InfoWindow {
    maxWidth: 250
    content: """
      Q42 #{denHaag}<br><br>
      #{$("#map-nl-qers").html()}<br><br>
      <span class="get-directions" id="to-q070">#{getDirections}</span>
    """
  }
  q070Marker.addListener "click", -> q070InfoWindow.open mapNL, q070Marker

  QSAMarker = new google.maps.Marker _.extend markerTemplate, {
    title: "Q42 Mountain View"
    place:
      placeId: 'ChIJ8eAPBU63j4ARP8l2yv4loBc'
      location: {lat: 37.40915, lng: -122.075035}
  }
  QSAMarker.setMap mapUS
  QSAInfoWindow = new google.maps.InfoWindow {
    maxWidth: 250
    content: """
      Q42 Mountain View<br><br>
      #{$("#map-us-qers").html()}<br><br>
      <span class="get-directions" id="to-qsa">#{getDirections}</span>
    """
  }
  QSAMarker.addListener "click", -> QSAInfoWindow.open mapUS, QSAMarker

Meteor.startup ->
  Session.setDefault("mapRendered", no)
  Session.setDefault("currentGeo", null)

mapRendered = ->
  unless Session.equals "mapRendered", yes
    key = "AIzaSyCvAL7yv2v-bVICrxQoPX8UzJ3Mm0QIOLo"
    url = "https://maps.googleapis.com/maps/api/js?key=#{key}&callback=initMap&signed_in=true"
    $.getScript(url)
    Session.set("mapRendered", yes)
  else
    initMap()

Template["over-q42"].rendered = mapRendered
Template["en_about-q42"]?.rendered = mapRendered

Template.map.helpers
  usQer: -> Employees.find handle: "rahul"
  nlQer: -> Employees.find handle: $ne: "rahul"
