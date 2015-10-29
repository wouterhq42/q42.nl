Meteor.startup( () => {
  new Konami( () => Session.set("headerGameActive", true));
  Session.setDefault("headerGameActive", false);
});
