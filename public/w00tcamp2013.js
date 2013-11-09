window.w00tcamp2013 = function() {
  this.createBar();
  console.log("This website was made during w00tcamp 2013: http://q42.nl/w00tcamp");
}
w00tcamp2013.prototype.createBar = function() {
  this.bar = document.createElement('div');
  this.bar.id = "w00tcamp2013";
  this.bar.addEventListener("click", function(evt) {
    window.location.href = "http://q42.nl/w00tcamp";
  }.bind(this));
  document.body.appendChild(this.bar);

  this.bar.innerHTML = "<div id=w00tcamp2013-logo><img src=http://q42.nl/images/w00tcamp/w00tcamp-logo.png></div><div class=w00tcamp2013-message>" +
                       "This page was created during <a href='http://q42.nl/w00tcamp'>w00tcamp</a> 2013. " +
                       "Click to find out more.</div>";
                       
  this.link = document.createElement("link");
  this.link.setAttribute("href", "http://q42.nl/w00tcamp2013.css");
  this.link.setAttribute("type", "text/css");
  this.link.setAttribute("rel", "stylesheet");
  var head = document.getElementsByTagName("head");
  if (head && head[0]) head[0].appendChild(this.link);
}
var wc = new w00tcamp2013();