Meteor.startup(() => {
  Meteor.subscribe('work');
  Meteor.subscribe('things');
});

function work() {
  return Work.findOne({ slug: FlowRouter.current().params.slug });
}
Template.workDetail.helpers({
  work: () => work(),
  qers: () => Employees.find({ handle: { $in: work().properties.qers } }),
  getThing: (thingId) => Things.findOne({ name: thingId }),
  prettifyDate: (date) => `${date.getMonth()+1}/${date.getFullYear()}`
});
