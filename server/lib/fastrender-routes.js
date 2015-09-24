FastRender.onAllRoutes(function() {
  this.subscribe("lights");
  this.subscribe("micrio");
});

FastRender.route("/", function() {
  this.subscribe("employeeCount");
});

FastRender.route("/blog", function() {
  this.subscribe("blogpostIndex", 1);
  this.subscribe("pagesByTag", "");
  this.subscribe("LatestComments", 10);
});

FastRender.route("/blog/page/:pageNum", function(params) {
  this.subscribe("blogpostIndex", params.pageNum * 1);
  this.subscribe("pagesByTag", "");
  this.subscribe("LatestComments", 10);
});

FastRender.route("/blog/tagged/:tag", function(params) {
  this.subscribe("blogpostTitles", 1, params.tag);
  this.subscribe("pagesByTag", params.tag || "");
  this.subscribe("LatestComments", 10);
});

FastRender.route("/blog/post/:id?/:title?", function(params) {
  this.subscribe('blogpostFull', 1 * params.id);
  this.subscribe("blogpostTitles", 1);
  this.subscribe("blogComments", 1 * params.id);
  this.subscribe("LatestComments", 10);
});

FastRender.route("/over-q42", function(params) {
  this.subscribe("employees");
  this.subscribe("coffeeCounter");
});
FastRender.route("/about-q42", function(params) {
  this.subscribe("employees");
  this.subscribe("coffeeCounter");
});

FastRender.route("/vacatures", function(params) {
  this.subscribe("blogpostTitles", "vacature");
});
FastRender.route("/meteor", function(params) {
  this.subscribe("blogpostTitles", "meteor");
});
FastRender.route("/io", function(params) {
  this.subscribe("blogpostTitles", "io");
});
FastRender.route("/iot", function(params) {
  this.subscribe("blogpostTitles", "iot");
});
