initMap = function() {
  const styles = [{
    "featureType":"road",
    "elementType":"geometry",
    "stylers":[{"lightness":100},{"visibility":"simplified"}]
  },{
    "featureType":"water",
    "elementType":"geometry",
    "stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]
  },{
    "featureType":"poi",
    "elementType":"geometry.fill",
    "stylers":[{"color":"#C5E3BF"}]
  },{
    "featureType":"road",
    "elementType":"geometry.fill",
    "stylers":[{"color":"#D1D1B8"}]
  }];
  const map = new google.maps.Map($("#map")[0], {
    center: new google.maps.LatLng(44.7960005,-56.840491),
    zoom: 3,
    mapTypeControl: false,
    streetViewControl: false,
    styles: styles,
    scrollwheel: false
  });
  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  google.maps.event.addListener(map, "click", () => {
    map.setOptions({ scrollwheel: true });
  });

  google.maps.event.addListener(map, "mouseout", () => {
    map.setOptions({ scrollwheel: false });
  });

  google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
    $("#maps").removeClass("loading");
  });

  const getCurrentGeo = function(cont) {
    navigator.geolocation.getCurrentPosition((geo) => {
      geocoder = new google.maps.Geocoder();
      latlng = new google.maps.LatLng(geo.coords.latitude, geo.coords.longitude);
      geocoder.geocode({latLng: latlng}, (res, status) => {
        if (status === google.maps.GeocoderStatus.OK){
          cont(res[0]);
        }
      });
    });
  };

  const setDirections = function(nlUs, dest, currentGeo) {
    const request = {
      origin: currentGeo.formatted_address,
      destination: new google.maps.LatLng(dest.lat, dest.lng),
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, (res, status) => {
      if (status === google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(res);
      } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS){
        alert("Could not route to your location. :(");
      } else {
        console.warn("Unknown error while trying to route.", status);
      }
    });
  };

  const denHaag = Session.equals("lang", "en") ? "The Hague" : "Den Haag";
  const tld = Session.equals("lang", "en") ? "com" : "nl";
  const getDirections = Session.equals("lang", "en") ? "Get directions (driving)" : "Toon routebeschrijving (met de auto)";

  const markerTemplate = {
    icon: {
      url: "http://static.q42.nl/images/q42-logo-map-marker.png",
      size: new google.maps.Size(32, 49),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(8, 25),
      scaledSize: new google.maps.Size(16, 25),
    },
    attribution: {
      source: "Q42.${tld}",
      webUrl: "http://q42.${tld}"
    }
  };

  $("#maps").on("click", ".get-directions", function() {
    getCurrentGeo((currentGeo) => {
      id = $(this).attr("id").replace("to-", "");
      if (id === "q020") setDirections("nl", {lat: 52.375273, lng: 4.930484}, currentGeo);
      if (id === "q070") setDirections("nl", {lat: 52.069291, lng: 4.323498}, currentGeo);
      if (id === "qsa") setDirections("us", {lat: 37.40915, lng: -122.075035}, currentGeo);
    });
  });

  const q020Marker = new google.maps.Marker(_.extend(markerTemplate, {
    title: "Q42 Amsterdam",
    place: {
      placeId: 'ChIJHZ0iUg8JxkcRKOwjwMJmk4k',
      location: {lat: 52.375273, lng: 4.930484}
    }
  }));
  q020Marker.setMap(map);
  const q020InfoWindow = new google.maps.InfoWindow({
    maxWidth: 250,
    content: `
      Q42 Amsterdam<br><br>
      ${$("#map-nl-qers").html()}<br><br>
      <span class="get-directions" id="to-q020">${getDirections}</span>
    `
  });
  q020Marker.addListener("click", () => q020InfoWindow.open(map, q020Marker));

  const q070Marker = new google.maps.Marker(_.extend(markerTemplate, {
    title: `Q42 ${denHaag}`,
    place: {
      placeId: 'ChIJN5_o2-G2xUcR-H1qGRErYGk',
      location: {lat: 52.069291, lng: 4.323498}
    }
  }));
  q070Marker.setMap(map);
  const q070InfoWindow = new google.maps.InfoWindow({
    maxWidth: 250,
    content: `
      Q42 ${denHaag}<br><br>
      ${$("#map-nl-qers").html()}<br><br>
      <span class="get-directions" id="to-q070">${getDirections}</span>
    `
  });
  q070Marker.addListener("click", () => q070InfoWindow.open(map, q070Marker));

  const QSAMarker = new google.maps.Marker(_.extend(markerTemplate, {
    title: "Q42 Mountain View",
    place: {
      placeId: 'ChIJ8eAPBU63j4ARP8l2yv4loBc',
      location: {lat: 37.40915, lng: -122.075035}
    }
  }));
  QSAMarker.setMap(map);
  const QSAInfoWindow = new google.maps.InfoWindow({
    maxWidth: 250,
    content: `
      Q42 Mountain View<br><br>
      ${$("#map-us-qers").html()}<br><br>
      <span class="get-directions" id="to-qsa">${getDirections}</span>
    `
  });
  QSAMarker.addListener("click", () => QSAInfoWindow.open(map, QSAMarker));
};

let mapRendered = false;
Template.map.onRendered( () => {
  if (!mapRendered){
    key = "AIzaSyCvAL7yv2v-bVICrxQoPX8UzJ3Mm0QIOLo";
    url = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&signed_in=true`;
    $.getScript(url);
    mapRendered = true;
  } else {
    initMap();
  }
});

Template.map.helpers({
  usQer: () => Employees.find({handle: "rahul"}),
  nlQer: () => Employees.find({handle: {$ne: "rahul"}})
});
