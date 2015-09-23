syntaxHighlight = ->
  a = no
  $('code').each ->
    $parent = $(this).parent()
    if not $parent.hasClass("prettyprint") and $parent.is("pre")
      $parent.addClass("prettyprint")
      a = yes
  prettyPrint() if a

Template.blog.onRendered syntaxHighlight
Template.blogpost.onRendered syntaxHighlight
Template.en_blog?.onRendered syntaxHighlight
