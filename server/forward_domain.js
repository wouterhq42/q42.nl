
// 301 redirect to remove www. from domain
Meteor.startup(function() {
  Meteor.Router.add("*", function() {
    var host = this.request.headers.host;
    var url = this.request.url;
    var fullURL = "http://" + host + url;

    if (host.indexOf("www") == 0) {
      return [301, {Location: fullURL.replace("www.", "")}, ""];
    }

    return false;
  });
});