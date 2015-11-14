Template.headerlights.onCreated(function() {
  this.subscribe("lights");
  this.autorun(() => {
    let light = Lights.find({}, {sort: {date: -1}}).fetch()[0];
    if (!light) return;
    let newColor = "#" + light.hex;
    setLightingStyle(newColor, getColor2FromHex(newColor));
  });
});

getColor2FromHex = (hex) => {
  let num = parseInt(hex.replace("#", ""), 16);
  let r = num >> 16;
  let g = num & 0x0000ff;
  let b = (num >> 8) & 0x00ff;
  let r1 = r * 0.5;
  let g1 = g;
  let b1 = b * 0.3;
  return String("000000" + (g1 | (b1 << 8) | (r1 << 16)).toString(16)).slice(-6);
};

hex2rgba = (hex, op) => {
  hex = hex.replace('#','');
  let r = parseInt(hex.substring(0,2), 16);
  let g = parseInt(hex.substring(2,4), 16);
  let b = parseInt(hex.substring(4,6), 16);
  return `rgba(${r},${g},${b},${op / 100})`;
};

setLightingStyle = (col1, col2) => {
  addCss = (sel, rule) => {
    let stylesheet = document.styleSheets[document.styleSheets.length-1];
    // use a try/catch here to ignore errors trying
    // to insert eg. -moz- rules into chrome
    try {
      stylesheet.insertRule(`${sel} {${rule}}`, stylesheet.cssRules.length);
    } catch(e) {}
  };

  // set small block headers
  let rgba1 = hex2rgba(col1, 30);
  let rgba2 = hex2rgba(col2, 30);
  let rule = `background-image: linear-gradient(180deg, ${rgba1}, ${rgba2})`;
  addCss(".block-small .body > h2", rule);

  // set large block body backgrounds
  rgba1 = hex2rgba(col1, 20);
  rgba2 = hex2rgba(col2, 20);
  let g = "radial-gradient(closest-corner,rgba(16,47,70,0) 60%,rgba(16,47,70,0.26))";
  rule = `background-image: ${g}, linear-gradient(180deg, ${rgba1}, ${rgba2})`;
  rule += ", linear-gradient(0deg, rgba(0,0,0,0.9), rgba(0,0,0,0.5))";
  addCss(".container .block-large > .body", rule);

  // set page background colour
  rgba1 = hex2rgba(col1, 5);
  addCss("body, .blog-post header", `background-color: ${rgba1}`);
};

Template.headerlights.events({
  "click #lights-color": (evt) => {
    if (!supportsInputTypeColor())
      $(document.body).toggleClass("show-colorpicker");
  },

  // XXX: the input event sometimes doesn't fire the first time you select
  // a color in the picker in Chrome, so we also attach it to click
  "click #lights-color, input #lights-color": (evt) => {
    let color = $(evt.target).val().replace("#", "");
    if (!color) return;
    $.get(`http://huelandsspoor.nl/api/lamps/setcolor?color=${color}`, () => {
      $.get("/updateLightbar");
      Session.set("backgroundsVisible", true);
    });
  }
});

Template.headerlights.helpers({
  lightsColor() {
    let light = Lights.find({}, {sort: {date: -1}}).fetch()[0];
    if (light)
      return "#" + light.hex;
  },
  supportsInputTypeColor: () => supportsInputTypeColor(),
  explanation() {
    if (Utils.getSiteVersion() === "en")
      return "en_lightsExplanation";
    else
      return "lightsExplanation";
  }
});

Template.backgrounds.helpers({
  color: () => Lights.find({}, {sort: {date: 1}}),
  col1() { return this.hex; },
  col2() { return getColor2FromHex(this.hex); }
});
