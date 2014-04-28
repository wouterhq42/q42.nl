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
    else if hour >= 8 and hour <= 18 and day isnt 6 and day isnt 7
      newCount = currentCount + ~~(Math.random() * 4.2) # average a cup of coffee every 4.2 minutes

    first = CoffeeCounter.findOne()
    CoffeeCounter.update first._id, $set: count: newCount
  , 1000 * 60 # update the counter every minute