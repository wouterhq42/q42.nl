$Events("header", {
    "click #mobile-menu-icon": (evt) => $("body").toggleClass("show-mobile-menu"),
    "focus li a":                 () => $("body").addClass("show-mobile-menu"),
    "click li a":                 () => $("body").removeClass("show-mobile-menu")
});
