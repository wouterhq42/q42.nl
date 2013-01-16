Meteor.autosubscribe(function() {
  Meteor.subscribe("blogpostIndex", Session.get("blogpage"), Session.get("blogtag"));
});
Meteor.autosubscribe(function() {
  Meteor.subscribe("blogpostFull", Session.get("blogpostid"));
});
var Posts = new Meteor.Collection("Posts");

Template.blog.postGroup = function() {
  var posts = Posts.find().fetch();
  var postGroups = [];
  while (posts.length)
    postGroups.push(posts.splice(0, 3));
  return postGroups;
}
Template.blogpost.post = function() {
  return Posts.findOne({ id: Session.get("blogpostid") });
}