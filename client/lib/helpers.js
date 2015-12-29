Template.registerHelper("langEn", () => Utils.getSiteVersion() === "en");
Template.registerHelper("isPhantom", () => /phantom/i.test(navigator.userAgent));
Template.registerHelper("assetsUrl", () => Utils.getStaticAssetsUrl());
