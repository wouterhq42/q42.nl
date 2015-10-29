Meteor.startup( () => {
  if (CoffeeCounter.find().count() === 0){
    CoffeeCounter.insert({count: 0});
  }

  Meteor.publish("coffeeCounter", () => CoffeeCounter.find());

  updateCoffeeCounter = function() {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    const first = CoffeeCounter.findOne();
    const currentCount = first.count;
    let newCount = currentCount;

    // reset at midnight
    if (hour === 0) {
      newCount = 0;

    // work day - increment
    } else if (hour >= 8 && hour <= 18 && day !== 6 && day !== 0){
      const ceil = hour < 12 ? 20 : 30;
      const inc = ~~(Math.random() * 42) > ceil ? 1 : 0;
      newCount = currentCount + inc;
    }

    if (newCount !== currentCount){
      CoffeeCounter.update(first._id, {$set: {count: newCount}});
    }

    // update the counter every minute
    Meteor.setTimeout(updateCoffeeCounter, 1000 * 60);
  }

  updateCoffeeCounter();
});
