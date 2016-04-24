import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Utils } from '../../../lib/utils'
import { Work, WorkTags, Media } from '../lib/collections'
import { $Helpers, $OnCreated } from '../../../client/lib/_template'

Meteor.startup(() => {
  // XXX: get rid of this since it subscribes the whole site to everything
  Meteor.subscribe('work');
  Meteor.subscribe('things');
});

Template.registerHelper('workItems', () => {
  const work = Work.find({}, {
    sort: {"properties.pinned": -1, name: 1}
  }).fetch();
  return _.toArray(_.groupBy(work, (el, i) => ~~(i/3)));
});
Template.registerHelper('imageThumbnail', imageId => {
  const media = Media.findOne(imageId);
  if (media) return media;
});

Template.workTagBlock.helpers({
  workTags() {
    const tags = WorkTags.findOne();
    if (tags)
      return tags.tags;
  },
  isSelected(tag) {
    const selectedTag =
      Template.instance().selectedTag.get() || FlowRouter.current().params.tag;
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
