Meteor.autosubscribe(function() {
  Meteor.subscribe("blogpostIndex", Session.get("blogpage"), Session.get("blogtag"));
});
Meteor.autosubscribe(function() {
  Meteor.subscribe("blogpostFull", Session.get("blogpostid"));
});
var Posts = new Meteor.Collection("Posts");

Template.blog.post = function() {
  return Posts.find();
}
Template.blogpost.post = function() {
  return Posts.findOne({ id: Session.get("blogpostid") });
}