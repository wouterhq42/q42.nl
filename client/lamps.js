var Colors = new Meteor.Collection("colors");

function updateLightbar() {
  var colors = _.map(Colors.find().fetch(), function(doc) { return "#" + doc.hex; });
  console.log("Draw colors", colors);

  var handcraftCornerLight = colors[9]; //12
  var stefOfficeLight = colors[0];
  var rijksmuseumTeamLight = colors[4];
  var cynthiaDeskLight = colors[23];
  var _9292Light = colors[26];
  var kitchenLight = colors[14];

  colors = [handcraftCornerLight, stefOfficeLight, rijksmuseumTeamLight, cynthiaDeskLight, _9292Light];
  if (Colors.find().count() == 29) // THERE ARE 29 LIGHTS!!!
    $("#header").css("background", "-webkit-linear-gradient(left, " + colors + ")");
}

Meteor.startup(function() {
  Meteor.autorun(function() {
    Meteor.subscribe("colors");
    updateLightbar();
  });
});