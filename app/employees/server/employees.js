import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'

import { Employees } from '../lib/shared'
import { currentQers } from './lib/qers'

_.each(currentQers, (e) => {
  e.labels = [];
  const qer = Employees.findOne({handle: e.handle});
  if (qer) {
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
