Meteor.startup ->
  if CoffeeCounter.find().count() is 0
    CoffeeCounter.insert count: 0

  Meteor.publish "coffeeCounter", -> CoffeeCounter.find()

  Meteor.setInterval ->
    date = new Date()
    day = date.getDay()
    hour = date.getHours()
    first = CoffeeCounter.findOne()
    currentCount = first.count
    newCount = currentCount

    # reset at midnight
    if hour is 0
      console.log "-- Reset coffee counter --"
      newCount = 0

    # work day - increment
    else if hour >= 8 and hour <= 18 and day isnt 6 and day isnt 0
      if hour < 12
        newCount = currentCount + (if ~~(Math.random() * 42) > 20 then 1 else 0)
      else
        newCount = currentCount + (if ~~(Math.random() * 42) > 30 then 1 else 0)

    if newCount isnt currentCount
      console.log "Update coffee counter... #{newCount}"
      CoffeeCounter.update first._id, $set: count: newCount

  , 1000 * 60 # update the counter every minute
