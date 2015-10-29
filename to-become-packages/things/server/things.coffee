Meteor.publish "things", (thingIds) ->
  check(thingIds, Array)
  Things.find name: $in: thingIds

if Things.find().count() is 0

  for thingId in [
    "benbenet", "game-of-drones"
    "jumpstarts-header", "jumpstarts-intro"
    "livelearn", "nannii", "paper", "shell"
    "spinn", "swisscom", "taxi-electric", "tesloop", "umuntu-media"
  ]
    try Things.insert
      name: thingId
      content: Assets.getText("things/#{thingId}.html")
