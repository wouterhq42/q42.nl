Meteor.startup(function() {
  Session.setDefault("employees_filter", "Q'er");
});
Deps.autorun(function() {
  Meteor.subscribe("employees");
});

/**********************/
/* For both languages */
/**********************/
$Template({
  employees: {
    employee: function () {
      var filter = Session.get("employees_filter");
      if (_.first(filter) == "/" && _.last(filter) == "/") {
        var regex;
        try {
           regex = new RegExp(_.without(filter, "/").join(""), "i");
        }
        catch(e) {}
        if (regex)
          return Employees.find({$or: [{name: regex}, {phone: regex}, {handle: regex}, {web: regex}]});
      }
      else if (filter != "" && filter != "Q'er") {
        return Employees.find({labels: {$in: [filter]}}, {sort: {name: 1}});
      }
      else
        return Employees.find({}, {sort: {name: 1}});
    }
  }
});

Handlebars.registerHelper('avatar_static', function() {
  return this.imageStatic || this.handle + "zw.jpg";
});
Handlebars.registerHelper('avatar_animated', function() {
  return this.imageAnimated || this.handle + "gif.gif";
});

Handlebars.registerHelper('firstname', function() {
  if (!this.name)
    return "droid";
  return this.name.split(" ")[0];
});
Handlebars.registerHelper('email', function() {
  return this.email || this.handle;
});

/**************/
/* Dutch only */
/**************/
Template.employees.filter = function() {
  return Session.get("employees_filter");
}

Template.employees.desjaak = function() {
  return Session.equals("employees_filter", "De sjaak");
}
Template.employees.desjaakName = function() {
  return Employees.findOne({labels: {$in: ["De sjaak"]}}).name.split(" ")[0];
}
Template.employees.desjaakHandle = function() {
  return Employees.findOne({labels: {$in: ["De sjaak"]}}).handle;
}





var zIndex = 1000;
var polaroids = {};
var mobileMaxWidth = 620;
var isTouchEnabled = false;
$(window).one("touchstart",  function (e) { isTouchEnabled = true; });

var Polaroid = function ($li) {

  var $polaroid = $li.find(".polaroid");
  var $picture = $li.find(".color");
  var $zw = $li.find(".zw");

  function swapGif() {
    var animatedGif = $picture.data("src");
    var colorSrc = $picture.attr("src");
    if (animatedGif != colorSrc)
      $picture.attr("src", animatedGif);
  }
  function swapGifMobile() {
    var animatedGif = $picture.data("src");
    var zwSrc = $zw.attr("src");
    if (animatedGif != zwSrc)
      $zw.attr("src", animatedGif);
  }
  function swapGifMobileBackToZw() {
    var animatedGif = $picture.data("src");
    var zwSrc = $zw.attr("src");
    var zwDataSrc = $zw.data("src");
    if (animatedGif == zwSrc)
      $zw.attr("src", zwDataSrc);
  }
  function rotatePolaroid() {
    var randomRotation = Math.floor(Math.random() * 21) - 10;
    var rotateValue = 'scale(1.0) rotateZ(' + randomRotation + 'deg)';

    $polaroid.css({
      '-webkit-transform': rotateValue,
      '-moz-transform': rotateValue,
      '-ms-transform': rotateValue,
      '-o-transform': rotateValue,
      'transform': rotateValue
    });
  }
  function intitializeHover(el) {
    var $li = $(el);
    var $polaroidLists = $('#colleagues .polaroid').parent("li");
    $polaroidLists.removeClass('hover').removeClass('openedByHover');
    var windowWidth = $(window).width();
    if (windowWidth > mobileMaxWidth)
      $li.addClass('hover');
    else
      swapGifMobile();

    $polaroid.css('z-index', ++zIndex);
    $polaroidLists.find('.closePolaroid').remove();
    if (isTouchEnabled) {
      var $closebutton = $('<div class="closePolaroid" />');
      $closebutton.click(hide);
      $polaroid.append($closebutton);
    }
  }
  function show(el) {
    swapGif();
    rotatePolaroid();
    intitializeHover(el);
  }
  function hide(el) {
    var $li = $(el);
    $li.removeClass('hover').removeClass('openedByHover');
    $li.find('.closePolaroid').remove();
  }
  return {
    show: show,
    hide: hide,
    swapGifMobileBackToZw : swapGifMobileBackToZw
  }
}

function onWindowResize() {
  var windowWidth = $(window).width();

  //make sure we hide all open polaroid if the window size changed
  if (windowWidth <= mobileMaxWidth)
    hideAllPolaroids();
  else
    swapAllMobileHoversBackToBlackAndWhite();
}
function swapAllMobileHoversBackToBlackAndWhite() {
  _.each(polaroids, function (p) { p.swapGifMobileBackToZw(); });
}
function hideAllPolaroids(){
  _.each(polaroids, function (p) { p.hide(); });
}

function showPolaroid(el) {
  var windowWidth = $(window).width();

  var $li = $(el);
  var name = $li.find(".color").attr("alt");
  polaroids[name] = polaroids[name] || new Polaroid($li);
  polaroids[name].show(el);
}
function hidePolaroid(el) {
  var $li = $(el);
  var name = $li.find(".color").attr("alt");
  polaroids[name] = polaroids[name] || new Polaroid($li);
  polaroids[name].hide(el);
}


var employeeEvents = {
  "mouseenter li": function(evt) {
    showPolaroid(evt.target);
  },
  "click li": function(evt) {
    showPolaroid(evt.target);
  },
  "mouseleave li": function(evt) {
    hidePolaroid(evt.target);
  }
};
Template.employees.events(employeeEvents);
Template.en_employees.events(employeeEvents);

Template.filter_employees.list = function() {
  var filters = [
     {name: "Projecten", items: ["Rijksmuseum", "9292", "Staatsloterij", "Schooltas", "Philips Hue", "TADC", "MENDO", "Iamsterdam",
      "Pepper", "D-reizen", "Greetz", "Malmberg"]}
    ,{name: "Producten", items: ["Handcraft"]}
    ,{name: "Games",     items: ["Cat Quest", "Quento", "Carrrrds", "Spaceventure"]}
    ,{name: "School",    items: ["Universiteit Utrecht", "De Haagse Hogeschool", "Hogeschool Rotterdam", "TU Delft",
                                 "Enschede", "Hogeschool van Amsterdam"]}
    ,{name: "Rol",       items: ["Projectleider", "Software Engineer", "Interaction Engineer", "Q'er", "De sjaak", "Oprichter", "Student"]}
    ,{name: "Misc",      items: ["Speelt nog World of Warcraft", "Weet wat Spiffy is",
      "Team Wintersport", "Heeft een baard", "Stokoud", "Tatoeage", "Voortgeplant",
      "Rijdt soms op een motor", "Wordt binnenkort aangenomen door Microsoft", "Vroeger stewardess geweest",
      "Heeft bij Fabrique gewerkt", "Verdient minder dan Jasper", "Google IO alumni",
      "WWDC kaartje kwijtgeraakt", "Heeft Max Raabe live gezien", "Schoenmaat 42", "IQ boven de 200", "Blessure tijdens werktijd",
      "Ex-stagiair", "Ex-klant", "Ex-concullega", "Ex-ex-q'er", "Kan stiekem best goed programmeren", "Nerf gun owner"]}
  ]
  return filters;
}

Template.filter_employees.rendered = function() {
  $("#filter-colleagues select").val(Session.get("employees_filter"));
}

Template.filter_employees.events({
  "keyup [data-role='filter-qers']": function(evt) {
    var val = $(evt.target).val();
    Session.set("employees_filter", val);
  }
});