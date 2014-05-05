Meteor.startup ->
  if CoffeeCounter.find().count() is 0
    CoffeeCounter.insert count: 0

  Meteor.publish "coffeeCounter", -> CoffeeCounter.find()

  Meteor.setInterval ->
    newCount = 0
    date = new Date()
    day = date.getDay()
    hour = date.getHours()
    first = CoffeeCounter.findOne()
    currentCount = first.count

    # reset at midnight
    if hour is 0
      newCount = 0

    # work day - increment
    else if hour >= 8 and hour <= 18 and day isnt 5 and day isnt 6
      newCount = currentCount + (if ~~(Math.random() * 42) > 30 then 1 else 0)

    first = CoffeeCounter.findOne()
    console.log "Update coffee counter... #{newCount}"
    CoffeeCounter.update first._id, $set: count: newCount
  , 1000 * 60 # update the counter every minute