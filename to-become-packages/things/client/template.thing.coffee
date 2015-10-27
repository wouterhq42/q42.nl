
Template.thing.onCreated ->
  @thingId = Template.currentData().id
  @autorun => @subscribe "things", [@thingId]

Template.thing.helpers
  content: -> Things.findOne(name: Template.instance().thingId)?.content



Template.group.onCreated ->
  @thingIds = Template.currentData().ids.split(",")
  @autorun => @subscribe "things", @thingIds

Template.group.helpers
  things: -> Things.find(name: $in: Template.instance().thingIds)
