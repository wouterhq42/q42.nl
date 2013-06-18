var retries = 0;
resizeFBwidget = function () {
  var $fbWidget = $('.fb_iframe_widget iframe');
  if ($fbWidget.length != 0) {
    $fbWidget.width('100%')
  } else {
    // try to adjust the width of the FB max 100 times
    if (retries < 100) {
      setTimeout(function () {
        retries++;
        resizeFBwidget();
      }, 300);
    }

  }
}

resize = function (event) {
  var widths = [0, 480, 620, 940, 9999], cur = $(window).width();
  for (var i = 1; i < widths.length; i++) {
    var upperBound = widths[i], lowerBound = widths[i - 1];
    if (cur > lowerBound && cur < upperBound) {
      $('html').removeClass().addClass('lt-' + upperBound);
      break;
    }
  }
}