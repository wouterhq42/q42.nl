var Lights = new Meteor.Collection("lights");
var NUM_LIGHTS = 29; // THERE ARE 29 LIGHTS!!!

function updateLightbar() {
  var lights = [];
  if (Lights.find().count() > 0) {
    lights = _.map(Lights.find().fetch(), function(doc) {
      return "#" + doc.hex;
    });
  }

  var handcraftCornerLight = lights[9]  || "#9fc";
  var stefOfficeLight      = lights[0]  || "#c9f";
  var rijksmuseumTeamLight = lights[4]  || "#f66";
  var cynthiaDeskLight     = lights[23] || "#cf9";
  var _9292Light           = lights[26] || "#9cf";
  var kitchenLight         = lights[14] || "#9cf";

  lights = [handcraftCornerLight, stefOfficeLight, rijksmuseumTeamLight, cynthiaDeskLight, _9292Light];
  if (Lights.find().count() == NUM_LIGHTS) {
    $("#header").css("background", "-webkit-linear-gradient(left, " + lights + ")");
    $("#header").css("background", "-moz-linear-gradient(left, " + lights + ")");
    $("#header-bg-gradient").css("opacity", 0);
    Meteor.setTimeout(function() {
      $("#header-bg-gradient").css({
        background: "-webkit-linear-gradient(left, " + lights + ")",
        background: "-moz-linear-gradient(left, " + lights + ")",
        opacity: 1
      });
      Session.set("lightsColor", lights[0]);
    }, 400)
  }
}

Meteor.startup(function() {
  Deps.autorun(function() {
    Meteor.subscribe("lights");
    updateLightbar();
  });
});