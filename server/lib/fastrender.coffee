FastRender.onAllRoutes ->
  @subscribe("lights")
  @subscribe("micrio")
  @subscribe("allUserData")

FastRender.route "/", ->
  @subscribe("employeeCount")
