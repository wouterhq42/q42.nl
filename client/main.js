Meteor.startup(function () {
  $(window).bind('resize', resize);
  $(window).bind('resize', resizeFBwidget);
  $(window).bind("resize", resizeShowreel);
  $(window).bind("scroll", bounceBack);

  var lang = _.last(window.location.hostname.split(".")) == "com" ? "en" : "nl";
  Session.setDefault("lang", lang);
  moment.lang(lang);

  // http://stackoverflow.com/questions/8278670/how-to-check-if-a-html5-input-is-supported
  var supportsInputTypeColor = (function() {
    var i = document.createElement("input");
    i.setAttribute("type", "color");
    return i.type !== "text";
  })();
  Session.setDefault("supportsInputTypeColor", supportsInputTypeColor);

  Session.setDefault("toggleLights", false);
  Session.setDefault("lightsColor", "#000000");

  Session.setDefault("date", new Date());
  Meteor.setInterval(function() {
    Session.set("date", new Date());
  }, 1000);

  Deps.autorun(function() {
    var turnOnLights = Session.get("toggleLights") != (Session.get("date").getHours() > 20 || Session.get("date").getHours() < 7);
    $(document.body).toggleClass("lights-off", turnOnLights);
  });

  Deps.autorun(function() {
    Meteor.subscribe("allUserData");
  });

  marked.setOptions({ breaks: true });

  Backbone.history.start({pushState: true});
});

var isPhantom = /phantom/i.test(navigator.userAgent);
Handlebars.registerHelper("isPhantom", function() {
  return isPhantom;
});

Template.body.content = function() {
  var lang = Session.get("lang") == "en" ? "en_" : "";
  var page = Session.get("page") || "home";

  // if the template for the current language doesn't exist,
  // fall back to Dutch version or show a 404
  var template = Template[lang + page] || Template[page] || Template[lang + "error404"];

  return template();
}
Template.body.rendered = function() {
  // If we've given the main section the show class we're done.
  if ($("body>section.show")[0])
    return;

  if (!Session.equals("page", undefined) && !Session.equals("page", "home"))
    document.title = $(this.find('h1')).text() + " - Q42";

  reattachBehavior();

  updateLightbar();
}

Template.body.viewRendersHeader = function() {
  var page = Session.get("page") || "home";
  return page == "home";
}

Template.body.header = function() {
  var lang = Session.get("lang") == "en" ? "en_" : "";
  var template = Template[lang + "header"];
  return template();
}

Template.body.footer = function() {
  var lang = Session.get("lang") == "en" ? "en_" : "";
  var template = Template[lang + "footer"];
  return template();
}

Template.body.events({
  "click a[href^='/']": function handleLinkClick(evt) {
    Router.loadPage(evt.target.getAttribute("href"));
    window.scrollTo(0,0);
    evt.preventDefault();
    return false;
  }
});

Template.en_error404.url = Template.error404.url = function() {
  return document.location.pathname;
}

Template.en_regelsCode.regelsCode = Template.regelsCode.regelsCode = function() {
  var numQers = Employees.find().count();
  var Qers = [], to;
  for (var i = 0; i < numQers; i++) Qers.push(new Qer());
  var counter = 0;

  (function cycle() {
    clearTimeout(to);
    var lines = 0;
    var now = new Date();
    for (var i = 0; i < numQers; i++) lines += Qers[i].linesWritten(now);
    lines = Math.round(lines);
    counter = Math.max(lines, 0);
    to = setTimeout(cycle, 1000);
  })();

  function Qer() {
    var codeLinesPerDay = 100 + 200 * Math.random(); //100-600
    var hoursWorkPerDay = 6 + 2 * Math.random(); //6-8

    var startsAt = new Date();
    startsAt.setHours(Math.round(8 + 3 * Math.random())); //7AM - 10AM
    startsAt.setMinutes(Math.round(60 * Math.random()));

    var workLength = new Date(0);
    workLength.setHours(Math.round(hoursWorkPerDay));

    this.linesWritten = function (date) {
      var linesWritten = 0;
      var timeWorked = new Date(date.getTime() - startsAt.getTime());
      var perc = Math.min(1, timeWorked.getTime() / workLength.getTime());
      return codeLinesPerDay * perc;
    }
  };

  return counter;
}

Template.en_numQers.numQers = Template.numQers.numQers = function() {
  return Employees.find().count();
}

Template.en_koppenKoffie.koppenKoffie = Template.koppenKoffie.koppenKoffie = function() {
  return koffieteller();
}

var templateHeaderEvents = {
  "click #lights-toggle a": function(evt) {
    Session.set("toggleLights", !Session.get("toggleLights"));
    $(document.body).toggleClass("lights-off");
    evt.preventDefault();
  },
  "click #lights-color": function() {
    if (!Session.get("supportsInputTypeColor")) {
      $(document.body).toggleClass("show-colorpicker");
    }
  },
  "input #lights-color": function(evt) {
    var color = $(evt.target).val().replace("#", "");
    if (color) {
      $.get("http://huelandsspoor.nl/api/lamps/setcolor?color=" + color, function() {
        $.get("/updateLightbar");
        $(evt.target).attr("value", "#" + color).css("background-color", "#" + color);
      });
    }
  }
};
Template.en_header.events(templateHeaderEvents);
Template.header.events(templateHeaderEvents);

Template.en_header.lightsColor = Template.header.lightsColor = function() {
  return Session.get("lightsColor");
}
Template.en_header.supportsInputTypeColor = Template.header.supportsInputTypeColor = function() {
  return Session.get("supportsInputTypeColor");
}
Template.en_header.supportsSVG = Template.header.supportsSVG = function() {
  return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
}


var widgetsTimeout = null;

function reattachBehavior() {
  resize();
  resizeShowreel();

  setReadmoreBouncers();
  homepageShowreel();
  bounceBack();

  if (!isPhantom) {

    if (!window._gaq) {
      window._gaq = [];
      _gaq.push(['_setAccount', 'UA-2714808-1']);
      _gaq.push(['_trackPageview']);
      (function () {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    }

    Meteor.clearTimeout(widgetsTimeout);
    widgetsTimeout = Meteor.setTimeout(function() {
      $("body>section").addClass("show");
      $("#homecontent").addClass("show");

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/nl_NL/all.js#xfbml=1&appId=292443547438127";
        fjs.parentNode.insertBefore(js, fjs);
      } (document, 'script', 'facebook-jssdk'));

      resizeFBwidget();

      // Twitter
      twttr && twttr.widgets.load();
    }, 0);

  }


}