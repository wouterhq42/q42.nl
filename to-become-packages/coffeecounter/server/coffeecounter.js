Meteor.startup( () => {
  const iotApi = DDP.connect("https://iot-api.scalingo.io");
  const CoffeeCups = new Mongo.Collection("coffeecups", iotApi);

  Meteor.publish("coffeeCounter", function() {
    const yesterday = new Date(new Date().setHours(0,0,0,0)).toISOString();
    Counts.publish(this, "coffeeCups",
      CoffeeCups.find({published_at: {$gt: yesterday}}));
  });
});
