Template.registerHelper "langEn", -> Session.equals "lang", "en"
Template.registerHelper "isPhantom", -> /phantom/i.test navigator.userAgent
