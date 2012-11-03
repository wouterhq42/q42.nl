$(function load() {
  $(window).bind('resize', resize);
  resize();
});

function resize(event) {
  var widths = [0, 480, 620, 940, 9999], cur = $(window).width();
  for (var i = 1; i < widths.length; i++) {
    var upperBound = widths[i], lowerBound = widths[i - 1];
    if (cur > lowerBound && cur < upperBound) {
      $('html').removeClass().addClass('lt-' + upperBound);
      break;
    }
  }
}
