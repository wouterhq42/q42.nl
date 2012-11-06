var showreelTimeout;
var showreelDeg = 0;
var showreelZ = 0;
var showreelItemCount = 0;

function homepageShowreel() {
  // declare global items
  $showreel = $('#showreel2');
  $nav = $showreel.find('nav');

  var $items = $showreel.find('.item');
  showreelItemCount = $items.length;
  for (var i = 0; i < showreelItemCount; i++) {
    $("#indicators").append("<span data-number=" + i + ">●</span>");
  }
  $("#indicators").find('span:first').addClass('active');
  $("#indicators").delay(1000).animate({ opacity: 1 }, 500);
  $("#indicators span").on("click", handleIndicatorClick);

  showreelDeg = 360 / showreelItemCount;
  showreelZ = $items.width() / 2 / Math.tan(showreelDeg / 2 * Math.PI / 180);
  var prevPosition = 0;
  $items.each(function (i) {
    $(this).css("-webkit-transform", "rotateY(" + showreelDeg * i + "deg) translateZ(" + showreelZ + "px)");
    $(this).css("-moz-transform", "rotateY(" + showreelDeg * i + "deg) translateZ(" + showreelZ + "px)");
    if ($.browser.webkit || $.browser.mozilla) {
      $(this).css("display", "block");
    }
  });
  $("#showreel-stage").css("-webkit-transform", "translateZ(-" + showreelZ + "px)");
  $("#showreel-stage").css("-moz-transform", "translateZ(-" + showreelZ + "px)");
  $("#showreel-shape").css("-webkit-transform", "rotateY(360deg)");
  $("#showreel-shape").css("-moz-transform", "rotateY(360deg)");
  setTimeout(function () {
    $("#showreel-stage").addClass("transition");
    $("#showreel-shape").addClass("transition");
  }, 0);

  showreelTimeout = setTimeout(nextShowreelItem, 8000);
  setTimeout(q42Is, 3000);

  setTimeout(resizeShowreel, 0);
}

function nextShowreelItem() {
  var $currentItem = $showreel.find('.active-item');
  var $nextItem = $currentItem.next('.item');
  if ($nextItem.length == 0)
    $nextItem = $showreel.find('.item:first');
  var nr = $nextItem.attr("data-number");
  gotoShowreelItem(nr);
}

function handleIndicatorClick(e) {
  var nr = $(e.target).attr("data-number");
  gotoShowreelItem(nr, true);
}

function gotoShowreelItem(nr, click) {
  var $currentItem = $showreel.find('.active-item');
  var $nextItem = $showreel.find('.item[data-number="' + nr + '"]');
  var $currentIndicator = $('#indicators .active');
  var $nextIndicator = $('#indicators span[data-number="' + nr + '"]');

  if ($currentItem.attr("data-number") == nr) {
    return;
  }

  clearTimeout(showreelTimeout);

  $currentItem.removeClass('active-item');
  $nextItem.addClass('active-item');
  $currentIndicator.removeClass('active');
  $nextIndicator.addClass('active');

  var position = 360 - showreelDeg * (nr != 0 ? nr : showreelItemCount);
  $("#showreel-shape").css("-webkit-transform", "rotateY(" + position + "deg)");
  $("#showreel-shape").css("-moz-transform", "rotateY(" + position + "deg)");
  $("#showreel-stage").css("-webkit-transform", "translateZ(-" + showreelZ * 1.3 + "px)");
  $("#showreel-stage").css("-moz-transform", "translateZ(-" + showreelZ * 1.3 + "px)");
  setTimeout(function () {
    $("#showreel-stage").css("-webkit-transform", "translateZ(-" + showreelZ + "px)");
    $("#showreel-stage").css("-moz-transform", "translateZ(-" + showreelZ + "px)");
  }, 1250);
  setTimeout(function () {
    if (nr == 0) {
      $("#showreel-shape").removeClass("transition");
      $("#showreel-shape").css("-webkit-transform", "rotateY(360deg)");
      $("#showreel-shape").css("-moz-transform", "rotateY(360deg)");
      setTimeout(function () {
        $("#showreel-shape").addClass("transition");
      }, 0);
    }
  }, 2500);

  showreelTimeout = setTimeout(nextShowreelItem, 12000);
}

function q42Is() {
  var container = $("#q42is div");
  var currentItem = $("#q42is span.selected");
  var nextItem = currentItem.next();
  currentItem.removeClass("selected");
  container.delay(300).animate({ left: '-=' + currentItem.outerWidth() }, 1000, 'easeInOutQuart', function () {
    nextItem.addClass("selected");
    container.css({ left: 0 });
    container.append(currentItem);
    setTimeout(q42Is, 8000);
  });
}

function resizeShowreel() {
  // De showreel vult de volledige hoogt van het scherm minus de ruimte voor de titel,
  // maar nooit meer dan 2,5 keer de breedte van het scherm en nooit minder dan de
  // breedte van het scherm. Anders zie je wel erg gekke uitsnedes van de foto's.
  $("#showreel2").height(Math.min(Math.max($(window).height() - $("#q42is-header").outerHeight(), $(window).width() / 2.5), $(window).width()));
}
$(window).bind("resize", resizeShowreel);
