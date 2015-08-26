Template.registerHelper "widthEquals", (width) -> @width is width
Template.registerHelper "typeIs", (type) -> @type is type
Template.registerHelper "isPhantom", -> /phantom/i.test navigator.userAgent
Template.registerHelper "langEn", -> Session.equals "lang", "en"
