_.each(currentQers, (e) => {
  e.labels = [];
  e.floorplan = {
    q070: {x: 0, y: 0},
    q020bg: {x: 0, y: 0},
    q020boven: {x: 0, y: 0}
  };

  qer = Employees.findOne({handle: e.handle});

  if (qer && qer.floorplan){
    e.floorplan = qer.floorplan;
    Employees.update({handle: e.handle}, e);
  } else {
    Employees.insert(e);
  }
});

// Delete employees whose handles are no longer there
Employees.remove({
  handle: {
    $nin: _.map(currentQers, (e) => e.handle)
  }
});

Employees.allow({
  insert: () => false
});

Meteor.publish("employees", () => {
  return Employees.find({}, {sort: {name: 1}});
});
