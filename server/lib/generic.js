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

var admins = ['sjoerd@q42.nl', 'rahul@q42.nl', 'chris@q42.nl', 'matthijs@q42.nl'];
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