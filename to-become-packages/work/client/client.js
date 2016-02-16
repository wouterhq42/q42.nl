Meteor.startup(() => {
  Meteor.subscribe('work');
  Meteor.subscribe('things');
});

function currentWork() {
  return Work.findOne({ slug: FlowRouter.current().params.slug });
}

$Template({
  workDetail: {
    work: () => currentWork(),
    qers: () => Employees.find({ handle: { $in: currentWork().properties.qers } }),
    getThing: (thingId) => Things.findOne({ name: thingId }),
    prettifyDate: (date) => `${date.getMonth()+1}/${date.getFullYear()}`
  },
  work: {
    allWork() {
      const work = Work.find({}, {
        // first the pinned items, then alphabetically
        sort: {"properties.pinned": -1, name: 1}
      }).fetch();
      let result = _.toArray(_.groupBy(work, (el, i) => ~~(i/3)));

      // quick hack to make it easier to figure out how to show
      // the filters block as the first item of the second row
      if (result[1])
        result[1][0].showTagFiltersHere = true;
      else if (result[0])
        result[0][0].showTagFiltersHere = true;

      return result;
    }
  },
  portfolioItem: {
    isPinned(work) {
      return work.properties && work.properties.pinned ? "pinned" : "";
    }
  }
});

Template.workTagBlock.helpers({
  workTags() {
    const tags = WorkTags.findOne();
    if (tags)
      return tags.tags;
  },
  isSelected(tag) {
    const selectedTag = Template.instance().selectedTag.get() || FlowRouter.current().params.tag;
    return selectedTag === tag;
  }
});

Template.workTagBlock.onCreated(function() {
  this.selectedTag = new ReactiveVar("");
});

Template.workTagBlock.events({
  "click aside a" (evt) {
    const tag = evt.target.innerHTML;
    Meteor.subscribe("work", null, tag);
    // FlowRouter.go($(evt.target).attr("href"));
    evt.preventDefault();
    Template.instance().selectedTag.set(tag);
  }
});
