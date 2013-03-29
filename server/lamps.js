var Lights = new Meteor.Collection("lights");

function updateLightbar() {
  console.log("Asking huelandsspoor for light data...")
  Meteor.http.get("http://huelandsspoor.nl/api/lamps/getlamps", function(err, result) {
    _.each(Lights.find().fetch(), function(doc) { Lights.remove({_id: doc._id}); });
    _.map(JSON.parse(result.content), function(item) {
      if (item.ColorHex)
        Lights.insert({hex: item.ColorHex});
    });
    console.log("Received", Lights.find().count(), "lights");
  });
}

Meteor.publish("lights", function() {
  return Lights.find();
});