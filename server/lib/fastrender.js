FastRender.onAllRoutes(function() {
  this.subscribe("lights");
  this.subscribe("micrio");
  this.subscribe("allUserData");
});

FastRender.route( "/", function() {
  this.subscribe("employeeCount");
});
