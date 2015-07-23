
getThing = (thingId) ->
  try
    Assets.getText("things/#{thingId}.html")

# The Things collection is empty on the server, and we just push contents
# dynamically to the client-side collection using the below publication.
Meteor.publish "things", (thingIds) ->
  check(thingIds, Array)

  for thingId in thingIds
    thing = getThing thingId
    if thing
      @added "things", new Mongo.ObjectID(), {name: thingId, content: thing}

  @ready()
