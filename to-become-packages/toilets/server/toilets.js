Meteor.startup(function () {
  var ToiletsServer = DDP.connect("wclights.q070.nl");
  Toilets = new Mongo.Collection("toilets", ToiletsServer);
  ToiletsServer.subscribe("toilets");
});

Meteor.publish("toilets", function() {
  return Toilets.find({});
});
