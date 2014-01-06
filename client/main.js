Meteor.startup(function () {
  $(window).bind("resize", resizeFBwidget);
  $(window).bind("resize", resizeShowreel);
  $(window).bind("scroll", _.throttle(function() {
    $(document.body).toggleClass("scrolled", $(window).scrollTop() > 0);
  }, 100));

  var lang = _.last(window.location.hostname.split(".")) == "com" ? "en" : "nl";
  Session.setDefault("lang", lang);
  moment.lang(lang);

  setupLights();

  Session.setDefault("date", new Date());
  Meteor.setInterval(function() {
    Session.set("date", new Date());
  }, 1000);

  Deps.autorun(function() {
    Meteor.subscribe("allUserData");
  });

  Typekit.load();
});

var setupLights = function() {
  Session.setDefault("supportsInputTypeColor", (function() {
    // http://stackoverflow.com/a/8278718/16308
    var i = document.createElement("input");
    i.setAttribute("type", "color");
    return i.type !== "text";
  })());
  Session.setDefault("toggleLights", false);
  Session.setDefault("lightsColor", "#000000");
  Deps.autorun(function() {
    var turnOnLights = Session.get("toggleLights") != (Session.get("date").getHours() > 20 || Session.get("date").getHours() < 7);
    $(document.body).toggleClass("lights-off", turnOnLights);
  });
}

var isPhantom = /phantom/i.test(navigator.userAgent);
Handlebars.registerHelper("isPhantom", function() {
  return isPhantom;
});

Handlebars.registerHelper("defaultNav", function() {
  var page = Session.get("page") || "home";
  return page != "home";
});

Template.body.rendered = function() {
  if (!Session.equals("page", "") && !Session.equals("page", undefined) && !Session.equals("page", "home"))
    document.title = $(this.find('h1')).text() + " - Q42";
  reattachBehavior();
  updateLightbar();
};

Template.body.events({
  "click a[href^='/']": function handleLinkClick(evt) {
    var href = evt.target.getAttribute("href");
    if (!href || _.contains(href, ".")) return;
    Router.go(href);
    window.scrollTo(0,0);
    evt.preventDefault();
    return false;
  }
});

$Template({
  error404: {
    isEnglish: function() { return Session.equals("lang", "en"); },
    url: function() {
      return document.location.pathname;
    }
  },
  regelsCode: {
    regelsCode: function() {
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
  },
  numQers: {
    numQers: function() {
      return Employees.find().count();
    }
  },
  koppenKoffie: {
    koppenKoffie: function() {
      return koffieteller();
    }
  },
  header: {
    lightsColor: function() {
      return Session.get("lightsColor");
    },
    supportsInputTypeColor: function() {
      return Session.get("supportsInputTypeColor");
    },
    supportsSVG: function() {
      return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
    }
  }
});

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

var widgetsTimeout = null;

function reattachBehavior() {
  resizeShowreel();
  homepageShowreel();
  $("#page").addClass("show");

  if (!isPhantom) {
    attachGoogleAnalytics();
    attachFacebook();
    attachTwitter();
    attachGfycat();
    resizeFBwidget();
  }
}

function attachGoogleAnalytics() {
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
}
function attachFacebook() {
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/nl_NL/all.js#xfbml=1&appId=535367106516027";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));
}
function attachTwitter() {
  twttr && twttr.widgets.load();
}
function attachGfycat() {
  (function(d, t) {
    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = 'http://assets.gfycat.com/js/gfyajax-0.517d.js';
    s.parentNode.insertBefore(g, s);
  }(document, 'script'));
}