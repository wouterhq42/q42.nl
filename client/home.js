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
showreelPaused = false;

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

homepageShowreel = function () {
  // declare global items
  $showreel = $('#showreel');
  $nav = $showreel.find('nav');

  $("#indicators").html("");

  // setup indicators
  showreelItems = $showreel.find('.item');
  showreelItems.first().addClass("active-item");
  showreelItemCount = showreelItems.length;
  for (var i = 0; i < showreelItemCount; i++) {
    $(showreelItems[i]).attr("data-number", i);
    $("#indicators").append("<span data-number=" + i + ">●</span>");
  }
  $("#indicators").find('span:first').addClass('active');
  $("#indicators").delay(1000).animate({ opacity: 1 }, 500);
  $("#indicators span").on("click", handleIndicatorClick);

  $(window).bind("keyup", function keyup(evt) {
    $("#showreel-stage").addClass("transitioningByClick");
    $active = $("#indicators .active");
    var total = $("#indicators span");
    var nr = parseInt($active.attr("data-number"));
    if (!nr) nr = 0;
    if (evt.which == 39) {
      var next = nr + 1;
      if (next > total) next = 0;
      gotoShowreelItem(next, true);
    }
    if (evt.which == 37) {
      var prev = nr - 1;
      if (prev < 0) prev = total;
      gotoShowreelItem(prev, true);
    }
  });

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
  if (showreelPaused) return;
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

  var $stage            = $("#showreel-stage");
  var $shape            = $("#showreel-shape");
  var $currentItem      = $showreel.find('.active-item');
  var $nextItem         = $showreel.find('.item[data-number="' + nr + '"]');
  var $currentIndicator = $('#indicators .active');
  var $nextIndicator    = $('#indicators span[data-number="' + nr + '"]');
  var prevousItemNr     = $currentItem.attr("data-number");

  if (prevousItemNr == nr)
    return;

  $stage.addClass('transitioning');
  $currentItem.removeClass('active-item');
  $nextItem.addClass('active-item');
  $currentIndicator.removeClass('active');
  $nextIndicator.addClass('active');

  if (showreel3D) {
    if (prevousItemNr == 0 && nr == showreelItemCount - 1) {
      $shape.removeClass("transition");
      $shape.css("-webkit-transform", "rotateY(0deg)");
      $shape.css("-moz-transform", "rotateY(0deg)");
      requestAnimFrame(function () {
        $shape.addClass("transition");
      });
    }
    if (prevousItemNr == 0 && nr == 1) {
      $shape.removeClass("transition");
      $shape.css("-webkit-transform", "rotateY(360deg)");
      $shape.css("-moz-transform", "rotateY(360deg)");
      requestAnimFrame(function () {
        $shape.addClass("transition");
      });
    }

    var position = 360 - showreelDeg * nr;
    if (prevousItemNr == showreelItemCount - 1 && nr == 0)
      position = 0;

    requestAnimFrame(function () {
      $shape.css("-webkit-transform", "rotateY(" + position + "deg)");
      $shape.css("-moz-transform", "rotateY(" + position + "deg)");
      if (!$stage.hasClass('transitioningBySwipe')) {
        $stage.css("-webkit-transform", "translateZ(-" + showreelZ * 1.3 + "px)");
        $stage.css("-moz-transform", "translateZ(-" + showreelZ * 1.3 + "px)");
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
  nextItem.delay(300).addClass("selected");
  container.append(currentItem);

}

resizeShowreel = function () {
  // De showreel vult de volledige hoogt van het scherm minus de ruimte voor de titel,
  // maar nooit meer dan 2,5 keer de breedte van het scherm en nooit minder dan de
  // breedte van het scherm. Anders zie je wel erg gekke uitsnedes van de foto's.
  var max = Math.max($(window).height() - $("#q42is-header").outerHeight(), $(window).width() / 2.5);
  var min = Math.min(max, $(window).width());
  $("#showreel").height(min);

  // recalculate 3D circle
  if (onLoadFinished)
    setup3DShowreel();
}

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