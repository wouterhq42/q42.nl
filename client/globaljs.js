$(function () {
  resizeFBwidget();
});

$(function load() {
  $(window).bind('resize', resizeFBwidget);
});

var retries = 0;
function resizeFBwidget() {
  var $fbWidget = $('.fb_iframe_widget iframe');
  if ($fbWidget.length != 0) {
    $fbWidget.width('100%')
  } else {
    // try to ajust the width of the FB max 100 times
    if (retries < 100) {
      setTimeout(function () {
        retries++;
        resizeFBwidget();
      }, 300);
    }

  }
}