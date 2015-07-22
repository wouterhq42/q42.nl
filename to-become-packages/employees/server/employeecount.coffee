Meteor.startup ->
  EmployeeCount.update EmployeeCount.findOne()?._id, {
    $set: count: Employees.find().count()
  }, upsert: yes

Meteor.publish "employeeCount", -> EmployeeCount.find()
