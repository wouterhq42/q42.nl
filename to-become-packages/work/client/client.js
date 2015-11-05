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

Template.workTagBlock.helpers({
  workTags: () => {
    let tags = WorkTags.findOne();
    if (tags)
      return tags.tags;
  }
});

Template.work.helpers({
  allWork: () => {
    const work = Work.find({}, {
      // first the pinned items, then alphabetically
      sort: {"properties.pinned": -1, name: 1}
    }).fetch();
    let result = _.toArray(_.groupBy(work, (el, i) => ~~(i/3)));

    // quick hack to make it easier to figure out how to show
    // the filters block as the first item of the second row
    if (result[1])
      result[1][0].showTagFiltersHere = true;
    else
      result[0][0].showTagFiltersHere = true;

    return result;
  }
});

Template.portfolioItem.helpers({
  isPinned(work) {
    return work.properties && work.properties.pinned ? "pinned" : "";
  }
});

Template.work.events({
  "click aside a" (evt) {
    Meteor.subscribe("work", null, evt.target.innerHTML);
    // FlowRouter.go(`/work/tagged/${evt.target.innerHTML}`);
    evt.preventDefault();
  }
});
