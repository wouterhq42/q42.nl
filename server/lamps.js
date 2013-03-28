var Colors = new Meteor.Collection("colors");
function updateLightbar() {
  console.log("Asking huelandsspoor for light data...")
  Meteor.http.get("http://huelandsspoor.nl/api/lamps/getlamps", function(err, result) {
    _.each(Colors.find().fetch(), function(doc) { Colors.remove({_id: doc._id}); });
    _.map(JSON.parse(result.content), function(item) {
      Colors.insert({hex: item.ColorHex});
    });
    console.log("Received", Colors.find().count(), "lights");
  });

  // todo: handle colorloop
  /*Meteor.http.get("http://huelandsspoor.nl/api/lamps/getbridge", function(err, result) {
    var colors = _.map(result.data.Lights, function(item) {
      var state = item.state;
      return "hsla(" + [state.hue, state.sat, state.bri, 1].join(",") + ")";
    });
    $("#header").css("background", "-webkit-linear-gradient(left, " + colors + ")");
  });*/
}

Meteor.Router.add("/updateLightbar", "GET", function() {
  this.response.setHeader("Access-Control-Allow-Origin", "http://huelandsspoor.nl");
  console.log("Received request from huelandsspoor. Updating...")
  updateLightbar();
  return 200;
});

Meteor.publish("colors", function() {
  return Colors.find();
});