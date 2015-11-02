$Template({
  header: {
    headerGameActive: () => Session.equals("headerGameActive", true),
    dev: () => window.location.href.indexOf("localhost") > -1
  }
});
