Meteor.Router.add("/updateLightbar", "GET", function() {
  this.response.setHeader("Access-Control-Allow-Origin", "http://huelandsspoor.nl");
  console.log("Received request from huelandsspoor. Updating...")
  updateLightbar();
  return 200;
});

Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {
    'services.github.id': 1,
    'services.github.email': 1,
    'services.facebook': 1,
    'services.google.id': 1,
    'services.google.picture': 1,
    'services.twitter.id': 1
  }});
});