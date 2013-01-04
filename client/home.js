var showreelItems = undefined;
var showreelDeg = 0;
var showreelZ = 0;
var showreelItemCount = 0;
var showreel3D = true;
var showreelReady = false;
var showreelTimer = undefined;
var q42IsTimer = undefined;
var q42IsFirstTime = true;
var showreelActiveItem = 0;
var onLoadFinished = false;

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function (callback) {
           window.setTimeout(callback, 1000 / 60);
         };
})();

function homepageShowreel() {
  // declare global items
  $showreel = $('#showreel2');
  $nav = $showreel.find('nav');

  // setup indicators
  showreelItems = $showreel.find('.item');
  showreelItemCount = showreelItems.length;
  for (var i = 0; i < showreelItemCount; i++) {
    $("#indicators").append("<span data-number=" + i + ">●</span>");
  }
  $("#indicators").find('span:first').addClass('active');
  $("#indicators").delay(1000).animate({ opacity: 1 }, 500);
  $("#indicators span").on("click", handleIndicatorClick);

  setup3DShowreel();
  if (showreel3D) {
    $("#showreel-shape").css("-webkit-transform", "rotateY(360deg)");
    $("#showreel-shape").css("-moz-transform", "rotateY(360deg)");
  }

  showreelTimer = new Date().getTime();
  requestAnimFrame(nextShowreelItem);

  q42IsTimer = new Date().getTime();
  requestAnimFrame(q42Is);
}

function setup3DShowreel() {
  if (showreel3D) {
    // we don't want the setup changes to animate
    // except when we are already transitioning
    if (!$("#showreel-stage").hasClass('transitioning')) {
      $("#showreel-stage").removeClass("transition");
      $("#showreel-shape").removeClass("transition");
    }

    showreelDeg = 360 / showreelItemCount;
    // calculate distance from centerpoint to edge of circle
    showreelZ = showreelItems.width() / 2 / Math.tan(showreelDeg / 2 * Math.PI / 180);
    // setup carousel circle
    showreelItems.each(function (i) {
      $(this).css("-webkit-transform", "rotateY(" + showreelDeg * i + "deg) translateZ(" + showreelZ + "px)");
      $(this).css("-moz-transform", "rotateY(" + showreelDeg * i + "deg) translateZ(" + showreelZ + "px)");
    });
    // move entire stage back so the viewport is at the edge
    $("#showreel-stage").css("-webkit-transform", "translateZ(-" + showreelZ + "px)");
    $("#showreel-stage").css("-moz-transform", "translateZ(-" + showreelZ + "px)");
  }
  // after everything is set up, we can add the transition class
  requestAnimFrame(function () {
    $("#showreel-stage").addClass("transition");
    $("#showreel-shape").addClass("transition");
  });
}

function nextShowreelItem() {
  requestAnimFrame(nextShowreelItem);
  if (new Date().getTime() - showreelTimer < 8000)
    return;
  goToNext();
}

function goToNext() {
  var $currentItem = $showreel.find('.active-item');
  var $nextItem = $currentItem.next('.item');
  if ($nextItem.length == 0)
    $nextItem = $showreel.find('.item:first');
  var nr = $nextItem.attr("data-number");
  gotoShowreelItem(nr);
}

function goToPrevious() {
  var $currentItem = $showreel.find('.active-item');
  var $nextItem = $currentItem.prev('.item');
  if ($nextItem.length == 0)
    $nextItem = $showreel.find('.item:last');
  var nr = $nextItem.attr("data-number");
  gotoShowreelItem(nr);
}

function handleIndicatorClick(e) {
  $("#showreel-stage").addClass("transitioningByClick");
  var nr = $(e.target).attr("data-number");
  gotoShowreelItem(nr, true);
}

function gotoShowreelItem(nr, click) {
  showreelActiveItem = nr;
  $("#showreel-stage").addClass('transitioning');
  var $currentItem = $showreel.find('.active-item');
  var $nextItem = $showreel.find('.item[data-number="' + nr + '"]');
  var $currentIndicator = $('#indicators .active');
  var $nextIndicator = $('#indicators span[data-number="' + nr + '"]');
  var prevousItemNr = $currentItem.attr("data-number");

  if (prevousItemNr == nr) {
    return;
  }

  $currentItem.removeClass('active-item');
  $nextItem.addClass('active-item');
  $currentIndicator.removeClass('active');
  $nextIndicator.addClass('active');

  if (showreel3D) {
    if (prevousItemNr == 0 && nr == showreelItemCount - 1) {
      $("#showreel-shape").removeClass("transition");
      $("#showreel-shape").css("-webkit-transform", "rotateY(0deg)");
      $("#showreel-shape").css("-moz-transform", "rotateY(0deg)");
      requestAnimFrame(function () {
        $("#showreel-shape").addClass("transition");
      });
    }
    if (prevousItemNr == 0 && nr == 1) {
      $("#showreel-shape").removeClass("transition");
      $("#showreel-shape").css("-webkit-transform", "rotateY(360deg)");
      $("#showreel-shape").css("-moz-transform", "rotateY(360deg)");
      requestAnimFrame(function () {
        $("#showreel-shape").addClass("transition");
      });
    }

    var position = 360 - showreelDeg * nr;
    if (prevousItemNr == showreelItemCount - 1 && nr == 0) {
      position = 0;
    }

    requestAnimFrame(function () {
      $("#showreel-shape").css("-webkit-transform", "rotateY(" + position + "deg)");
      $("#showreel-shape").css("-moz-transform", "rotateY(" + position + "deg)");
      if (!$('#showreel-stage').hasClass('transitioningBySwipe')) {
        $("#showreel-stage").css("-webkit-transform", "translateZ(-" + showreelZ * 1.3 + "px)");
        $("#showreel-stage").css("-moz-transform", "translateZ(-" + showreelZ * 1.3 + "px)");
      }
    });

    showreelTimer = new Date().getTime();
    requestAnimFrame(zoomStageBackIn);
  }
}

function zoomStageBackIn() {
  var delay = $('#showreel-stage').hasClass('transitioningBySwipe') ? 250 : 1250;
  if (new Date().getTime() - showreelTimer < delay) {
    requestAnimFrame(zoomStageBackIn);
    return;
  }
  showreelTimer = new Date().getTime();
  requestAnimFrame(afterTransition);

  // from this moment swiping to the next or previous items is fine
  swiping = false;

  $("#showreel-stage").css("-webkit-transform", "translateZ(-" + showreelZ + "px)");
  $("#showreel-stage").css("-moz-transform", "translateZ(-" + showreelZ + "px)");
}

function afterTransition() {
  var delay = $('#showreel-stage').hasClass('transitioningBySwipe') ? 250 : 1250;
  if (new Date().getTime() - showreelTimer < delay) {
    requestAnimFrame(afterTransition);
    return;
  }
  showreelTimer = new Date().getTime();

  $("#showreel-stage").removeClass("transitioning");
  $("#showreel-stage").removeClass("transitioningByClick");
  $('#showreel-stage').removeClass('transitioningBySwipe');
  $('#showreel-stage').removeClass('transitioningByDoubleSwipe');
}

function q42Is() {
  requestAnimFrame(q42Is);
  if (new Date().getTime() - q42IsTimer < (q42IsFirstTime ? 3000 : 8000))
    return;
  q42IsTimer = new Date().getTime();
  q42IsFirstTime = false;

  var container = $("#q42is div");
  var currentItem = $("#q42is span.selected");
  var nextItem = currentItem.next();
  currentItem.removeClass("selected");
  container.delay(300).animate({ left: '-=' + currentItem.outerWidth() }, 1000, 'easeInOutQuart', function () {
    nextItem.addClass("selected");
    container.css({ left: 0 });
    container.append(currentItem);
  });
}

function resizeShowreel() {
  // De showreel vult de volledige hoogt van het scherm minus de ruimte voor de titel,
  // maar nooit meer dan 2,5 keer de breedte van het scherm en nooit minder dan de
  // breedte van het scherm. Anders zie je wel erg gekke uitsnedes van de foto's.
  $("#showreel2").height(Math.min(Math.max($(window).height() - $("#q42is-header").outerHeight(), $(window).width() / 2.5), $(window).width()));

  // recalculate 3D circle
  if (onLoadFinished)
    setup3DShowreel();
}
$(window).bind("resize", resizeShowreel);
resizeShowreel();

$('#showreel-container')
.on('swipeleft', function (e) {
  setSwipeClass();
  goToNext();
})
.on('swiperight', function (e) {
  setSwipeClass();
  goToPrevious();
});

function setSwipeClass() {
  if ($('#showreel-stage').hasClass('transitioningBySwipe')) {
    $('#showreel-stage').addClass('transitioningByDoubleSwipe');
  } else {
    $('#showreel-stage').addClass('transitioningBySwipe');
  }
}

$('#showreel-container')
.on('movestart', function (e) {
  // If the movestart is heading off in an upwards or downwards
  // direction, prevent it so that the browser scrolls normally.
  if ((e.distX > e.distY && e.distX < -e.distY) ||
      (e.distX < e.distY && e.distX > -e.distY)) {
    e.preventDefault();
  }
});