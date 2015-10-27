@RouteUtils = {

  # return the correct name of the template
  # depending on the current language
  getTemplate: (name) ->
    if Session.equals("lang", "en") and Template["en_#{name}"]
      "en_#{name}"
    else if Session.equals("lang", "en") and !Template["en_#{name}"]
      "error404"
    else if Session.equals("lang", "nl") and !Template[name]
      "error404"
    else
      name

}
