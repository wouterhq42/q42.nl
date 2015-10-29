Meteor.methods({
  updatePosition: (id, x, y, loc) => {
    // used by floorplan.meteor.com app
    let obj = {};
    obj[`floorplan.#{loc}.x`] = x;
    obj[`floorplan.#{loc}.y`] = y;
    Employees.update(id, {$set: obj});
  }
});
