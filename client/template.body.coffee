Template.body.onRendered ->
  reattachBehavior()

Template.body.events
  "click body": -> $("body").removeClass "show-mobile-menu"
