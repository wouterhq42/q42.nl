function setReadmoreBouncers() {
  $('.block-readmore a').each(function () {
    $(this).addClass('readyToBounce');
    $(window).bind('scroll', bounceBack);
  });
}

function bounceBack() {
  $('.block-readmore a').each(function () {
    var el = $(this);
    if (checkPositionInWindow(el) < 97) {
      el.removeClass('readyToBounce');
    }
  });
}

function checkPositionInWindow(el) {
  // returns the percentage that the given element's bottom is removed from the top of the window
  var windowheight = $(window).height();
  var windowScrollTop = $(window).scrollTop();
  var elementPosition = el.offset();
  return (elementPosition.top + el.height() - windowScrollTop) / windowheight * 100;
}