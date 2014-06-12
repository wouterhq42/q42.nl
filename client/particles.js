$Template({
  header: {
    rendered: function() {
      function c(n) { if (!n) n = 255; return ~~(Math.random() * n); }
      function rgba(r, g, b, a) { return "rgba("+r+","+g+","+b+","+a+")"; }
      function rc(n, a) { return rgba(c(n), c(n), c(n), a); }
      function rp() { return ~~((Math.random()*2-1)*250); }
      function rr() { return ~~((Math.random()*2-1)*20); }
      function between(a, b) { return Math.max(a, ~~(Math.random()*b)); }

      function generateparticles(numparticles) {
        var particles = $(".particle");
        $("#particles").html("");
        _.times(numparticles, function(n){ generateparticle(n) });
        $("head").append($style);
      }

      function generateparticle(i) {
        var $particle = $("<div/>")
        $particle.addClass("particle");
        $particle.attr("id", "particle" + i);

        var delay = ~~(Math.random() * 4) + "s";
        var duration = between(10, 60) + "s";

        $particle.css("-webkit-animation", "float-particle"+i+" "+duration+" "+delay+" cubic-bezier(0.175, 0.885, 0.320, 1.275) infinite alternate");

        var dim = ~~(Math.random() * 150);
        $particle.css("width", dim + "px");
        $particle.css("height", dim + "px");

        var color = rc(0, .8);
        $particle.css("backgroundColor", color);

        $particle.css("boxShadow", "0 0 " + ~~(Math.random()*20) + "px " + color);
        $particle.css("padding", ~~(Math.random()*20) + "px");
        $particle.css("borderRadius", "50%");
        $particle.css("-webkit-filter", "blur(" + between(10,25) + "px)");

        var x = ~~((Math.random()*2-1) * $(window).width());
        var y = rp();
        var z = -rp();
        var rx = rr();
        var ry = rr();
        var rz = rr();

        $particle.css("-webkit-transform", "translateX(" + x + "px) translateY(" + y + "px) translateZ(" + z +
          "px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) rotateZ(" + rz + "deg)");
        $("#particles").append($particle);

        var dx = between(40, 100);
        dx = Math.random() < 0.5 ? dx : -dx;

        var rdx = between(5, 20);
        rdx = Math.random() < 0.5 ? rdx : -rdx;

        var from = "-webkit-transform: translate3d("+x+"px, "+y+"px, "+z+"px) rotateX("+rx+"deg) rotateY("+ry+"deg) rotateZ("+rz+"deg) scale(1); opacity: 1;";
        var to = "-webkit-transform: translate3d("+(x+dx)+"px, "+(y+dx)+"px, "+(z+dx)+"px) rotateX("+(rx+rdx)+"deg) rotateY("+(ry+rdx)+"deg) rotateZ("+(rz+rdx)+"deg) scale(1); opacity: 0";
        var wka = "\n@-webkit-keyframes float-particle"+i+" { from {" + from + "} to {" + to + "} }";

        $style.html($style.html() + wka);
      }

      var $style = $("<style/>");
      $style.attr('type', 'text/css');
      $style.html("");

      var numparticles = 100;
      generateparticles(numparticles);

    }
  }
});