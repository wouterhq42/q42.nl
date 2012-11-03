var $geenschool;

$(function () {
  geenschoolbuilding($('#geenschoolbuilding'));
  $(window).bind('scroll', scrollImage);
  setReadmoreBounchers();

  var moveQers = ["sjoerd", "frank", "remco", "jeroen", "katja", "rahul", "martijn", "benjamin",
                  "lukas", "janwillem", "herman", "paul", "jaap", "wilbert", "timd", "bob",
                  "johan", "suzanne", "bas", "cynthia", "michiel", "timl", "kamil", "jasper",
                  "ivo", "cihan", "thijs", "tims", "sander", "kars", "stef", "arian", "mark",
                  "richard", "christiaan", "elaine", "roelfjan", "martijnl", "tom", "korjan",
                  "chris", "sanjay", "leonard"];

  $.each(moveQers, function (index, value) { makeQerMove(value) });
  setDifferentRotationsForQers();

  $('#colleagues .polaroid').mouseenter(resetCinemagraph);

});

function geenschoolbuilding() {
  $geenschool = $('#geenschoolbuilding').addClass('geenschoolbuildinghoog');
  var geenschoolbuildinghoog = '<div id="geenschoolbuildinghoog"><img src="geenschoolhoog.jpg"/></div>'
  $geenschool.find('img').remove();
  $geenschool.append(geenschoolbuildinghoog);
  var caption = $geenschool.find('p');
  $geenschool.append(caption);
}

function scrollImage() {
  if ($geenschool.length != 0) {
    var percOfWindow = checkPositionInWindow($geenschool);

    var scrollStart = 90;
    var scrollEnd = 60;

    if (percOfWindow < scrollStart && percOfWindow > scrollEnd) {

      var image = $geenschool.find('img');
      var hiddenheight = image.height() - $geenschool.height();

      var newPerc = (percOfWindow - scrollEnd) * scrollStart / (scrollStart - scrollEnd);
      var marginTop = Math.round((newPerc / scrollStart) * hiddenheight * -1);

      image.css('margin-top', marginTop);
    }
  }


}

function setReadmoreBounchers() {
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

function makeQerMove(qer) {
  var qerPhoto = $('img[src="' + '/Static/Images/' + qer + 'zw.jpg' + '"]');
  if (qerPhoto.length != 0)
    qerPhoto.closest('li').find('.color').attr('src', '/Static/Images/' + qer + 'gif.gif');
}

function setDifferentRotationsForQers() {
  $('#colleagues').find('.polaroid').each(function () {
    var randomRotation = Math.floor(Math.random() * 21) - 10;
    var polaroid = $(this);
    polaroid.css('-webkit-transform', 'scale(1.0) rotate(' + randomRotation + 'deg)');
    polaroid.css('-webkit-transform', 'scale(1.0) rotate(' + randomRotation + 'deg)');
  });
}

function resetCinemagraph() {
  var $img = $(this).find('.insetshadow img');
  var src = $img.attr('src');
  $img.attr('src', '');
  setTimeout(function () {
    $img.attr('src', src);
  }, 0);
}
  