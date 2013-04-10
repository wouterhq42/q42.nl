
Template.colorpicker.enable = function() {
  return !Session.get("supportsInputTypeColor");
}

Template.colorpicker.events({
  "click #colorwheel": function(evt) {
    fromEvt(evt);
    evt.preventDefault();

    var color = outputCurrentColor();
    if (color) {
      $.get("http://huelandsspoor.nl/api/lamps/setcolor?color=" + color.replace("#", ""), function() {
        $.get("/updateLightbar");
        $("#lights-color").attr("value", "#" + color).css("background-color", "#" + color);
      });
    }
  }
});

Template.colorpicker.rendered = function() {
  var color = Session.get("lightsColor");
  readColor(color);
}

var currentColor = { v: 1, r: 1, g: 1, b: 1 };

function readColor(c)
{
  if (c.charAt(0) == '#') c = c.substr(1);
  setRGB(
    parseInt(c.substr(0, 2), 16)/255,
    parseInt(c.substr(2, 2), 16)/255,
    parseInt(c.substr(4, 2), 16)/255
  );
}

function setRGB(r, g, b)
{
  var v = Math.max(r, g, b);
  setValue(v);
  if (v == 0)
    setXY(0, 0);
  else
    setColor(r/v, g/v, b/v);
}

function setValue(v)
{
  currentColor.v = v;
  //outputCurrentColor();
  $("[name='value']").val(v * 255);
  $("#colors").css("opacity", v);
}

function setColor(r, g, b)
{
  currentColor.r = r;
  currentColor.g = g;
  currentColor.b = b;
  //outputCurrentColor();
  var x, y;
  var s = 1 - Math.min(r, g, b);
  if (s == 0)
    return setXY(0, 0);
  r = 1 - (1 - r) / s;
  g = 1 - (1 - g) / s;
  b = 1 - (1 - b) / s;
  if (g == 1)
  {
    if (b == 0)
    {
      x = r * 2 - 1; y = -1;
    }
    else
    {
      x = -1; y = b - 1;
    }
  }
  else if (r == 1)
  {
    if (b == 0)
    {
      x = 1; y = 1 - g * 2;
    }
    else
    {
      x = 1 - b; y = 1;
    }
  }
  else
  {
    if (r == 0)
    {
      x = -1; y = 1 - g;
    }
    else
    {
      x = r - 1; y = 1;
    }
  }
  setXY(x * (s * 0.9 + 0.1), y * (s * 0.9 + 0.1));
}

function setXY(x, y)
{
  currentColor.x = x;
  currentColor.y = y;
  var transform = "translate(" + (50 + x * 50) + " " + (50 + y * 50) + ")";
  $("#handle").attr("transform", transform);
}

function outputCurrentColor()
{
  var r = ~~(currentColor.r * currentColor.v * 255);
  var g = ~~(currentColor.g * currentColor.v * 255);
  var b = ~~(currentColor.b * currentColor.v * 255);
  var c = '#' + h2(r) + h2(g) + h2(b);

  $("[name='color']").val(c);
  $("#swatch").css("background", c);

  return c;
}

function h2(v)
{
  return (v < 16 ? '0' : '') + v.toString(16);
}

function fromEvt(event)
{
  var colorwheel = $("#colorwheel")[0];
  if (!colorwheel) return;

  var bcr = colorwheel.getBoundingClientRect();
  fromXY(
    (event.clientX - bcr.left) / 100 - 1,
    (event.clientY - bcr.top) / 100 - 1
  );
}

function fromXY(x, y)
{
  if (x < -1) x = -1;
  if (x > 1) x = 1;
  if (y < -1) y = -1;
  if (y > 1) y = 1;
  var s = (Math.max(Math.abs(x), Math.abs(y)) - 0.1) / 0.9;
  if (s <= 0)
    return setColor(1, 1, 1);
  var r, g, b;
  if (Math.abs(x) > Math.abs(y))
  {
    y /= Math.abs(x);
    if (x > 0)
    {
      r = 1; g = (1 - y) / 2; b = 0;
    }
    else
    {
      if (y < 0)
      {
        r = 0; g = 1; b = 1 + y;
      }
      else
      {
        r = 0; g = 1 - y; b = 1;
      }
    }
  }
  else
  {
    x /= Math.abs(y);
    if (y > 0)
    {
      if (x < 0)
      {
        r = 1 + x; g = 0; b = 1;
      }
      else
      {
        r = 1; g = 0; b = 1 - x;
      }
    }
    else
    {
      r = (x + 1) / 2; g = 1; b = 0;
    }
  }
  setColor(
    1 - (1 - r) * s,
    1 - (1 - g) * s,
    1 - (1 - b) * s
  );
}