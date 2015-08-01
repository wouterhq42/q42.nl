Router.onBeforeAction ->
  SubsManager.subscribe "lights"
  @next()
