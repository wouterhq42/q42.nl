Template.body.onRendered ->
  if $('img').length
    reattachBehavior() 
  else
  	Meteor.setTimeout reattachBehavior, 100

Template.body.events
  "click body": -> $("body").removeClass "show-mobile-menu"
