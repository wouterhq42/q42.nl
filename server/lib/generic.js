// Modification of the standard Meteor publish method
// This one also includes observeChanges handlers
publishRenamed = function (name, fn)
{
  Meteor.publish(name, function() {
    var self = this;
    var handle = fn.apply(this, arguments).observeChanges({
      added: function (id, fields) {
        self.added(name, id, fields);
      },
      changed: function (id, fields) {
        self.changed(name, id, fields);
      },
      removed: function (id) {
        self.removed(name, id);
      }
    });
    self.ready();
    self.onStop(function () {
      handle.stop();
    });
  })
}

// Blog admins
var admins = ['sjoerd@q42.nl', 'rahul@q42.nl', 'chris@q42.nl'];
Meteor.publish("allUserData", function () {
  Meteor.users.update({ 'services.google.email': { $in : admins } }, { $set: { isAdmin: true }})
  return Meteor.users.find({}, {fields: {
    'isAdmin': 1,
    'services.github.id': 1,
    'services.github.email': 1,
    'services.facebook': 1,
    'services.google.id': 1,
    'services.google.picture': 1,
    'services.twitter.id': 1,
    'services.twitter.profile_image_url': 1
  }});
});

FastRender.route("/", function() {
  this.subscribe("employeeCount");
});

FastRender.route("/blog", function() {
  this.subscribe("blogpostIndex", 1)
  this.subscribe("pagesByTag", "")
  this.subscribe("LatestComments", 10)
})

FastRender.route("/blog/page/:pageNum", function(params) {
  this.subscribe("blogpostIndex", params.pageNum * 1)
  this.subscribe("pagesByTag", "")
  this.subscribe("LatestComments", 10)
})

FastRender.route("/blog/tagged/:tag", function(params) {
  this.subscribe("blogpostIndex", 1, params.tag)
  this.subscribe("pagesByTag", params.tag || "")
  this.subscribe("LatestComments", 10)
});

FastRender.route("/blog/post/:id?/:title?", function(params) {
  this.subscribe('blogpostFull', 1 * params.id);
  this.subscribe("blogpostIndex", 1)
  this.subscribe("blogComments", 1 * params.id);
  this.subscribe("LatestComments", 10)
})

FastRender.route("/over-q42", function(params) {
  this.subscribe("employees");
})

FastRender.route("/vacatures", function(params) {
  this.subscribe("blogpostIndex", "vacature");
})
FastRender.route("/meteor", function(params) {
  this.subscribe("blogpostIndex", "meteor");
})
FastRender.route("/io", function(params) {
  this.subscribe("blogpostIndex", "io");
})