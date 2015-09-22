Template.numCupsOfCoffee.helpers
  numCupsOfCoffee: -> CoffeeCounter.findOne()?.count or 0
