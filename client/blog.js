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
  var post = Posts.findOne({ id: Session.get("blogpostid") });
  if (post)
    post.prettyDate = post.date.substr(8, 2) + "-" + post.date.substr(5, 2) + "-" + post.date.substr(0, 4);
  return post;
}