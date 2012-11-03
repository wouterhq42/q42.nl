var showreelTimeout;
var showreelTiming = 8000;

$(function () {
  // declare global items
  $showreel = $('#showreel2');
  $nav = $showreel.find('nav');

  var itemCount = $showreel.find('.item').length;
  for (var i = 0; i < itemCount; i++) {
    $("#indicators").append("<span data-number=" + i + ">●</span>");
  }
  $("#indicators").find('span:first').addClass('active');
  $("#indicators").delay(1000).animate({ opacity: 1 }, 500);

  $("#indicators span").on("click", gotoShowreelItem);

  showreelTimeout = setTimeout(nextShowreelItem, showreelTiming);
  setTimeout(q42Is, 3000);

});

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

function nextShowreelItem() {
  var $currentItem = $showreel.find('.active-item');
  var $nextItem = $currentItem.next('.item');
  var $previousItem = $showreel.find('.previous-item');
  if ($nextItem.length == 0)
    $nextItem = $showreel.find('.item:first');

  var $currentIndicator = $('#indicators .active');
  var $nextIndicator = $currentIndicator.next('span');
  if ($nextIndicator.length == 0)
    $nextIndicator = $('#indicators span:first');

  $previousItem.removeClass('previous-item');
  $currentItem.removeClass('active-item').addClass('previous-item');
  $nextItem.addClass('active-item');
  $currentIndicator.removeClass('active');
  $nextIndicator.addClass('active');

  showreelTimeout = setTimeout(nextShowreelItem, showreelTiming);
}

function gotoShowreelItem(e) {
  var nr = $(e.target).attr("data-number");

  var $nextItem = $showreel.find('.item[data-number="' + nr + '"]');
  var $currentItem = $showreel.find('.active-item');
  var $previousItem = $showreel.find('.previous-item');

  if ($currentItem.attr("data-number") == nr) return;

  clearTimeout(showreelTimeout);

  var $currentIndicator = $('#indicators .active');
  var $nextIndicator = $('#indicators span[data-number="' + nr + '"]');

  $previousItem.removeClass('previous-item');
  $currentItem.removeClass('active-item').addClass('previous-item');
  $nextItem.addClass('active-item');

  $currentIndicator.removeClass('active');
  $nextIndicator.addClass('active');

  showreelTimeout = setTimeout(nextShowreelItem, 6000);
}

function resizeShowreel() {
  // De showreel vult de volledige hoogt van het scherm minus de ruimte voor de titel,
  // maar nooit meer dan 2,5 keer de breedte van het scherm en nooit minder dan de
  // breedte van het scherm. Anders zie je wel erg gekke uitsnedes van de foto's.
  $("#showreel2").height(Math.min(Math.max($(window).height() - $("#q42is-header").outerHeight(), $(window).width() / 2.5), $(window).width()));
}
$(window).bind("resize", resizeShowreel);
resizeShowreel();