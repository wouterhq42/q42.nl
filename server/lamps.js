updateLightbar = function () {
  console.log("Asking huelandsspoor for light data...")
  Meteor.http.get("http://huelandsspoor.nl/api/lamps/getlamps", function(err, result) {
    var arr = JSON.parse(result.content);
    if (arr && arr[0])
      Lights.insert({hex: arr[0].ColorHex, date: new Date()});
  });
}

Meteor.publish("lights", function() {
  return Lights.find({}, {sort: {date: -1}, limit: 5});
});

Meteor.methods({
  cleanupLights: function() {
    Lights.remove({});
  }
});