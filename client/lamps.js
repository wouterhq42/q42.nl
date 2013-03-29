var Colors = new Meteor.Collection("colors");

function updateLightbar() {
  var colors = _.map(Colors.find().fetch(), function(doc) {
    if (doc.hex) return "#" + doc.hex;
    else return null;
  });
  colors = _.reject(colors, function(c) { return !c; });
  if (colors.length)
    console.log("Draw colors", colors);

  var handcraftCornerLight = colors[9] || "#9fc"; //12
  var stefOfficeLight = colors[0] || "#c9f";
  var rijksmuseumTeamLight = colors[4] || "#f66";
  var cynthiaDeskLight = colors[23] || "#cf9";
  var _9292Light = colors[26] || "#9cf";
  var kitchenLight = colors[14] || "#9cf";

  colors = [handcraftCornerLight, stefOfficeLight, rijksmuseumTeamLight, cynthiaDeskLight, _9292Light];
  if (1 || Colors.find().count() == 29) // THERE ARE 29 LIGHTS!!!
    $("#header").css("background", "-webkit-linear-gradient(left, " + colors + ")");
}

Meteor.startup(function() {
  Meteor.autorun(function() {
    Meteor.subscribe("colors");
    updateLightbar();
  });
});