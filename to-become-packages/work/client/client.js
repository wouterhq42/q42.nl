Template.workDetail.helpers({
  work: () => Work.findOne(),
  prettifyDate: (date) => `${date.getMonth()+1}/${date.getFullYear()}`
});

Template.work.helpers({
  workTags: () => {
    let tags = WorkTags.findOne();
    if (tags)
      return tags.tags;
  },
  allWork: () => {
    const work = Work.find({}, {
      sort: {"properties.pinned": -1, name: 1}
    }).fetch();
    let result = _.toArray(_.groupBy(work, (el, i) => ~~(i/3)));
    if (result[1])
      result[1][0].showTagFiltersHere = true;
    else
      result[0][0].showTagFiltersHere = true;
    return result;
  },
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
