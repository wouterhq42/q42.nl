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