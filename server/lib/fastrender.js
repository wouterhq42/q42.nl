FastRender.onAllRoutes(function() {
  this.subscribe("employeeCount");
  this.subscribe("lights");
  this.subscribe("allUserData");
});

FastRender.route( "/", function() {
  this.subscribe("employeeCount");
});
