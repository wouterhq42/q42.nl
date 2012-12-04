var zindexPolaroids = 1000;

var isTouchDevice = false;

if (document.addEventListener) {
  document.addEventListener('touchstart', function (e) { isTouchDevice = true; }, false);
} else {
  document.attachEvent('touchstart', function (e) { isTouchDevice = true; }, false);
}

$(function () {
  addPolaroidFunctionality();
})

var showPolaroidTimer;

function addPolaroidFunctionality() {
  $('#colleagues li').live('mouseenter click', function (e) {
    var el = $(this);
    var windowWidth = $(window).width();

    $('#colleagues .polaroid').each(function () {
      //console.log($(this).parent());
      if ($(this).parent().hasClass('hover')) {
        hidePolaroid($(this));
      }
    });

    if (windowWidth > 620) {
      var polaroid = el.find('.polaroid');
      var closebutton = $(this).find('.closePolaroid');
      //if (isTouchDevice && closebutton.length == 0) {
      if (isTouchDevice && closebutton.length == 0) {
        // append close button to polaroid when item is opened by click (touchdevices)
        closebutton = $('<div class="closePolaroid" />');
        closebutton.click(function () {
          hidePolaroid($(this).parent());
        });
        polaroid.append(closebutton);

        var phonenumberEl = $(this).children(':first-child');
        var phonenumber = phonenumberEl.html();
      }

      showPolaroidTimer = setTimeout(function () {
        // show polaroids with a delay
        showPolaroid(el);
      }, 0);
    } else {
      var $colorAva = el.find('.color');
      var $bwAva = el.find('.zw');
      $colorAva.insertAfter($bwAva);
      $colorAva.addClass('magnified');
    }
  }).find('.polaroid').live('mouseleave', function () {
    // hide polaroid when leaving the mouse with the cursor
    var el = $(this);
    hidePolaroid(el);

  });



  function showPolaroid(el) {
    var $body = $('html');
    var bodyWidth = $('body > section').width();
    var elPosition = el.position();
    //var elLeft = elPosition.left + (el.width() / 2);
    var elLeft = elPosition.left;
    var slope = ((344 / 2) / bodyWidth) * -1;
    //var newLeft = slope * elLeft + 17;
    var newLeft = elLeft + 17;


    var $polaroid = el.find('.polaroid');
    $polaroid.css('z-index', zindexPolaroids);
    el.addClass('hover');
    zindexPolaroids++;
  }

  $('#colleagues li').live('mouseleave', function () {
    clearTimeout(showPolaroidTimer);
  });


  //end addPolaroidFunctionality
}

function hidePolaroid(el) {
  el.parent().removeClass('hover').removeClass('openedByHover');
  el.find('.closePolaroid').remove();
}

var polaroidsActivated = true;

$(window).resize(function () {
  if ($(window).width() <= 620) {
    if (polaroidsActivated) {
      $('#colleagues li').die('mouseenter');
      $('#colleagues .polaroid').each(function () {
        var el = $(this);
        hidePolaroid(el);
      });
    }
    polaroidsActivated = false;
  } else {
    if (!polaroidsActivated) {
      addPolaroidFunctionality();
    }
    polaroidsActivated = true;
  }

});