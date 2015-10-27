Template.numCupsOfCoffee.helpers({
  numCupsOfCoffee: () => {
    CoffeeCounter.findOne() ? CoffeeCounter.findOne().count : 0;
  }
});
