Meteor.Router.add("/updateLightbar", "GET", function() {
  this.response.setHeader("Access-Control-Allow-Origin", "http://huelandsspoor.nl");
  console.log("Received request from huelandsspoor. Updating...")
  updateLightbar();
  return 200;
});