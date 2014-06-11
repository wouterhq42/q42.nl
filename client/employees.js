Meteor.startup(function() {
  Session.setDefault("employees_filter", "Q'er");
  Meteor.subscribe("employees");
});

UI.registerHelper('avatar_static', function() {
  return this.imageStatic || this.handle + ".jpg";
});
UI.registerHelper('avatar_animated', function() {
  return this.imageAnimated || this.handle + ".gif";
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
    },
    firstname: function() {
      if (!this.name)
        return "droid";
      return this.name.split(" ")[0];
    },
    email: function() {
      return this.email || this.handle;
    },
    filter: function() {
      return Session.get("employees_filter");
    },
    supportsWebm: function() {
      var video = document.createElement("video");
      return video.canPlayType("video/webm") == "probably";
    }
  }
});





var zIndex = 1000;
var polaroids = {};
var mobileMaxWidth = 620;
var isTouchEnabled = false;
$(window).one("touchstart",  function (e) { isTouchEnabled = true; });

var Polaroid = function ($li) {
  var $polaroid = $li.find(".polaroid");

  function rotatePolaroid() {
    var rotateValue = 'translate(-30px, -30px) scale(1.0) rotateZ(' + (Math.floor(Math.random() * 21) - 10) + 'deg)';
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

    $polaroid.css('z-index', ++zIndex);
    if (isTouchEnabled) {
      $('.closePolaroid').click(hide);
    }
  }
  function show(el) {
    rotatePolaroid();
    intitializeHover(el);
  }
  function hide(el) {
    var $li = $(el);
    $li.removeClass('hover').removeClass('openedByHover');
  }
  return {
    show: show,
    hide: hide
  }
}

function showPolaroid(el) {
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

$Template({
  employees: {
    events: {
      "mouseenter li": function(evt) {
        showPolaroid(evt.target);
      },
      "click li": function(evt) {
        showPolaroid(evt.target);
      },
      "mouseleave li": function(evt) {
        hidePolaroid(evt.target);
      }
    }
  }
});

Template.filter_employees.list = function() {
  return _.uniq(_.flatten(_.pluck(Employees.find().fetch(), "labels"))).sort();
}
Template.filter_employees.selected = function(filter) {
  return Session.equals("employees_filter", filter) ? "selected" : "";
}

Template.filter_employees.rendered = function() {
  $("#filter-colleagues select").val(Session.get("employees_filter"));
}

Template.filter_employees.events({
  "click li a": function(evt) {
    evt.preventDefault();
    var val = $(evt.target).text();
    Session.set("employees_filter", val);
    return false;
  },
  "keyup [data-role='filter-qers']": function(evt) {
    var val = $(evt.target).val();
    Session.set("employees_filter", val);
  }
});
