Template.numCupsOfCoffee.helpers({
  numCupsOfCoffee: () => {
    return Counts.get("coffeeCups");
  }
});
