Template.numCupsOfCoffee.helpers({
  numCupsOfCoffee: () => {
    return CoffeeCounter.findOne() ? CoffeeCounter.findOne().count : 0;
  }
});
