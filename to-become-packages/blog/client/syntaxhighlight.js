syntaxHighlight = function() {
  let a = false;

  $('code').each(function() {
    $parent = $(this).parent();
    if ( !$parent.hasClass("prettyprint") && $parent.is("pre") ){
      $parent.addClass("prettyprint")
      a = true;
    }
  });

  if (a) return prettyPrint();
}

Template.blog.onRendered(syntaxHighlight);
Template.blogpost.onRendered(syntaxHighlight);
if (Template.en_blog){
  Template.en_blog.onRendered(syntaxHighlight);
}
