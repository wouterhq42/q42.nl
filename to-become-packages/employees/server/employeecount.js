Meteor.startup( () => {
  if ( EmployeeCount.findOne() ){
    EmployeeCount.update(
      EmployeeCount.findOne()._id,
      {$set: {count: Employees.find().count()}},
      {upsert: true}
    );
  }
});

Meteor.publish("employeeCount", () => EmployeeCount.find());
