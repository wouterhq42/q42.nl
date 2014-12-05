Meteor.startup ->
  new Konami -> Session.set("headerGameActive", yes)
  Session.setDefault "headerGameActive", no
