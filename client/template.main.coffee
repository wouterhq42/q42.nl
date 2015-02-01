Template.main.helpers
  header: -> if Session.equals("lang", "en") then "en_header" else "header"
  footer: -> if Session.equals("lang", "en") then "en_footer" else "footer"
  openChat: -> Session.equals "openChat", yes
  chat: -> if Session.equals("lang", "en") then "en_chat" else "chat"

REMOVE_CLASS = 'fade-out'
INSERT_CLASS = 'fade-in'
TRANSITION_EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend'
ANIMATION_EVENTS = 'webkitAnimationEnd oAnimationEnd animationEnd msAnimationEnd animationend'
Template.main.rendered = ->
	$('#page')[0]._uihooks =
    insertElement: (node, next) ->
      if $(node).hasClass('container')
        $('#page').addClass 'page-transitioning'
        $(node).addClass(INSERT_CLASS).insertBefore(next).on TRANSITION_EVENTS + ' ' + ANIMATION_EVENTS, ->
          $(node).width()
          $(node).removeClass INSERT_CLASS
          $('#page').removeClass 'page-transitioning'
      else
        $(node).insertBefore(next)
    removeElement: (node) ->
      if $(node).hasClass('container')
        $('#page').addClass 'page-transitioning'
        $(node).addClass(REMOVE_CLASS).on TRANSITION_EVENTS + ' ' + ANIMATION_EVENTS, ->
          $(node).remove()
          $('#page').removeClass 'page-transitioning'
      else
        $(node).remove()
    moveElement: (node, next) ->
    	hooks.removeElement node
    	hooks.insertElement node, next
