Template.thing.onCreated(function() {
  this.thingId = Template.currentData().id;
  this.autorun( () => this.subscribe("things", [this.thingId]) );
});

Template.thing.helpers({
  content() {
    let thing = Things.findOne({name: Template.instance().thingId});
    if (thing)
      return thing.content;
  }
});

Template.group.onCreated(function() {
  this.thingIds = Template.currentData().ids.split(",");
  this.autorun( () => this.subscribe("things", this.thingIds) );
});

Template.group.helpers({
  things() {
    return Things.find({name: {$in: Template.instance().thingIds}});
  }
});
