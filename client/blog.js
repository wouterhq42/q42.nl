var Posts = new Meteor.Collection("Posts");

Template.blog.post = function() {
  var page = Session.get("blogpage") || 1;
  var tag = Session.get("blogtag");
  var filter = tag ? { tags: tag } : {};
  return Posts.find(filter, { limit: 10, skip: (page - 1) * 10, sort: { timestamp: -1 }});
}
Template.blogpost.post = function() {
  var id = Session.get("blogpostid");
  return Posts.findOne({ id: id });
}