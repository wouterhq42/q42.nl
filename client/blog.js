var Posts = new Meteor.Collection("Posts");

Template.blog.post = function() {
  var page = Session.get("blogpage") || 1;
  return Posts.find({}, { limit: 10, skip: (page - 1) * 10, sort: { timestamp: -1 }});
}
Template.blogpost.post = function() {
  var id = Session.get("blogpostid");
  return Posts.findOne({ id: id });
}