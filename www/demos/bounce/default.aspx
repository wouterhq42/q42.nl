<script>
var size = 15; var hsize = (size-1) / 2;
var xSize = 40, ySize = 20;
function doStart()
{
  for (var y = 0; y < size; y++)
  {
    for (var x = 0; x < size; x++)
    {
      var div = document.body.appendChild(document.createElement("div"));
      div.style.width = xSize;
      div.style.height = ySize;
      div.style.top = y * ySize + 20;
      div.style.left = x * xSize + 20;
    }
  }
  doRotate();
}

var t = 0;
function doRotate()
{
  var sint = Math.sin(t*3)*2;
  var cost = Math.cos(t)*2;
  var i = 0;
  for (var y = 0; y < size; y++)
  {
    for (var x = 0; x < size; x++)
    {
      var div = document.body.childNodes[i++];
      var r = (hsize-Math.abs(x - hsize)) * (hsize-Math.abs(y - hsize)) / hsize;
      div.style.backgroundPosition = Math.round(r*cost - x * xSize) + ' ' + Math.round(r*sint - y * ySize - 150);
    }
  }
  t += 0.1;
  setTimeout(doRotate, 20);
}
</script>
<style>
div {
  background: url(bounce.jpg);
  position: absolute;
  line-height: 1px;
}
</style>
<body onload="doStart()"></body>