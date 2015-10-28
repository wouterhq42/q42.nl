let polaroidVisibility = new ReactiveDict();

Meteor.startup( () => Session.setDefault("employees_filter", "Q'er") );

Template.registerHelper("avatar_static", function() {
  return this.imageStatic || `${this.handle}.jpg`;
});

Template.registerHelper("avatar_animated", function() {
  return this.imageAnimated || `${this.handle}.gif`;
});

Template.employees.helpers({
  employee: () => {
    const filter = Session.get("employees_filter");
    if (_.first(filter) === "/" && _.last(filter) === "/"){
      try {
        const regex = new RegExp(_.without(filter, "/").join(""), "i");
      } catch (error){
        console.log(error);
      }

      if (regex){
        return Employees.find({
          $or: [{name: regex}, {phone: regex}, {handle: regex}, {web: regex}]
        });
      }

    } else if (filter !== "" && filter !== "Q'er"){
      return Employees.find({labels: {$in: [filter]}});

    } else {
      return Employees.find();
    }
  },

  filter: () => Session.get("employees_filter")
});

if (Template.en_employees){
  Template.en_employees.helpers({
    employee: () => Employees.find()
  });
}




Template.employeeView.helpers({
  firstname: function() {
    return this.name ? this.name.split(" ")[0] : "droid";
  },
  email: function() {
    return this.email || this.handle;
  }
});

Template.employeeView.events({
  "mouseenter .qer, click .qer": function(evt) {
    polaroidVisibility.set(this._id, true);
  },
  "mouseleave .qer": function(evt) {
    polaroidVisibility.set(this._id, false);
  }
});

Template.employeeView.helpers({
  showPolaroid: function() {
    return polaroidVisibility.equals(this._id, true);
  }
});




Template.polaroid.onRendered(function(){
  this.autorun( () => {
    if ( !(polaroidVisibility.equals(Template.currentData()._id)) ){
      $polaroid = this.$(".polaroid");
      rotate = (Math.floor(Math.random() * 21) - 10);
      rotateValue = `translate(-30px, -30px) rotateZ(${rotate}deg)`;
      _.each(["webkit", "moz", "ms", "o"], (type) =>
        $polaroid.css `-${type}-transform`, rotateValue);
      $polaroid.css("transform", rotateValue);

      if (this.find("video")) this.find("video").play();
    }
  });
});

Template.polaroid.onDestroyed(function(){
  if (this.find("video")){
    this.find("video").pause();
  }
});

Template.polaroid.helpers({
  email: function(){
    return this.email || this.handle;
  },
  supportsWebm: () => {
    const video = document.createElement('video');
    return video.canPlayType('video/webm; codecs="vp8, vorbis"') === "probably";
  }
});

Template.polaroid.events({
  "click .closePolaroid": (evt) => {
    polaroidVisibility.set(Template.currentData()._id, false);
    // prevent the mouseenter listener on employeeView from firing
    evt.stopPropagation();
  }
});




Template.filter_employees.helpers({
  list: () => _.uniq(_.flatten(_.pluck(Employees.find().fetch(), "labels"))).sort(),
  selected: (filter) => Session.equals("employees_filter", filter) ? "selected" : ""
});

// Dutch only
Template.filter_employees.events({
  "click li a": (evt) => {
    evt.preventDefault();
    const val = $(evt.target).text();
    Session.set("employees_filter", val);
    return false;
  },
  "keyup [data-role='filter-qers']": (evt) => {
    val = $(evt.target).val();
    Session.set("employees_filter", val);
  }
});
