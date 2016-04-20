import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Work, WorkTags } from '../lib/collections'
import { $Helpers, $OnCreated } from '../../../client/lib/_template'
import { Employees } from '../../employees/lib/shared'

Meteor.startup(() => {
  // XXX: get rid of this since it subscribes the whole site to every thing
  Meteor.subscribe('things');
});

function currentWork() {
  return Work.findOne({ slug: FlowRouter.current().params.slug });
}

function luminance(colour) {
  if (!colour || colour == "transparent") return 0;
  const c = colour.substring(1);
  const red = parseInt(c.substr(0, 2), 16)/255;
  const green = parseInt(c.substr(2, 2), 16)/255;
  const blue = parseInt(c.substr(4, 2), 16)/255;
  return (red * 0.2126) + (green * 0.7152) + (blue * 0.0722);
}

function getPortfolioItemBrandColour() {
  const colour = new ReactiveVar("transparent");
  Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    const slug = FlowRouter.current().params.slug;
    if (slug) {
      const work = _.first(Work.find().fetch());
      if (work && work.properties && work.properties.color)
        colour.set(work.properties.color);
    }
    else colour.set("transparent");
  });
  return colour.get();
};

Template.registerHelper("portfolioItemBgColour", getPortfolioItemBrandColour);

$OnCreated("workDetail", function() {
  this.autorun(() => {
    FlowRouter.watchPathChange();

    const colour = getPortfolioItemBrandColour();
    let cssObj = {"background-color": colour};
    
    if (colour != "transparent") {
      cssObj = _.extend(cssObj, {"border-color": colour});
      $(document.body).toggleClass("inverted", luminance(colour) < 0.5);
    }

    $(document.body).css(cssObj);

    const work = currentWork();
    if (work && work.properties)
      this.subscribe("employees", work.properties.qers);
  });
});

$Helpers({
  workDetail: {
    work: () => currentWork(),
    qers() {
      const work = currentWork();
      if (work && work.properties)
        return Employees.find({ handle: { $in: _.uniq(work.properties.qers) } });
    },
    owner() {
      const work = currentWork();
      if (work && work.properties)
        return Employees.findOne({handle: work.properties.contact});
    },
    getThing: (thingId) => Things.findOne({ name: thingId }),
    prettifyDate: (date) => date ? `${date.getMonth()+1}/${date.getFullYear()}` : '',
    imageThumbnail: imageId => {
      const media = Media.findOne(imageId);
      if (media) return media.file;
      else return `${Utils.getStaticAssetsUrl()}/images/employees/anonymous.jpg`;
    }
  },
  work: {
    allWork() {
      return Work.find({}, {
        sort: {
          "properties.pinned": -1,
          name: 1
        }
      });
    }
  },
  portfolioItem: {
    isPinned(work) {
      return work.properties && work.properties.pinned ? "pinned" : "";
    },
    imageThumbnail: imageId => {
      const media = Media.findOne(imageId);
      if (media) return media.file;
      else return `${Utils.getStaticAssetsUrl()}/images/employees/anonymous.jpg`;
    }
  }
});

Template.workFilterBlock.helpers({
  workTags() {
    const tags = WorkTags.findOne();
    if (tags)
      return tags.tags;
  },
  types() {
    return ["Mobile app", "Backend platform", "Connected device",
            "Desktop app", "Website", "VR"];
  },
  isSelected(filter) {
    const selectedFilter = Template.instance().selectedFilter.get() || FlowRouter.current().params.tag;
    return selectedFilter === filter;
  }
});

Template.workFilterBlock.onCreated(function() {
  this.selectedFilter = new ReactiveVar("");
  this.autorun(() => {
    this.subscribe("work", null, null, this.selectedFilter.get());
  });
});

Template.workFilterBlock.events({
  "click aside a" (evt) {
    const type = evt.target.innerHTML;
    // FlowRouter.go($(evt.target).attr("href"));
    evt.preventDefault();
    Template.instance().selectedFilter.set(type);
  }
});
