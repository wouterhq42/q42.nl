window.blogpostFull = new Meteor.Collection("blogpostFull");
window.blogpostIndex = new Meteor.Collection("blogpostIndex");
window.LatestComments = new Meteor.Collection("LatestComments");

Template.en_blog.rendered = Template.blog.rendered = function() {
  syntaxHighlight();
}

Template.en_blogpost.rendered = Template.blogpost.rendered = function() {
  syntaxHighlight();
}

Template.en_blogpost.loggedin = Template.blogpost.loggedin = function() {
  return !!Meteor.user();
}
Template.en_blogpost.picture = Template.blogpost.picture = function() {
  return getPictureURL(Meteor.user());
}

var templateBlogPostEvents = {
  "click #addComment": function()
  {
    var comm = $("#comment")[0].value;
    if (comm)
      Meteor.call("addComment", Session.get("blogpostid"), comm);
    $("#comment")[0].value = "";
  },
  "click .edit-link": function(evt)
  {
    var $comment = $(evt.target).closest("li");
    $comment.addClass("edit-mode");
    $comment.find(".edit-area").attr("rows", this.text.replace(/[^\n]/g, '').length + 2)
    evt.preventDefault();
  },
  "click .save-link": function(evt)
  {
    var $comment = $(evt.target).closest("li");
    $comment.removeClass("edit-mode");
    Meteor.call("updateComment", this._id, $comment.find(".edit-area")[0].value);
    evt.preventDefault();
  },
  "click .delete-link": function(evt)
  {
    Meteor.call("deleteComment", this._id);
    evt.preventDefault();
  },
  "keyup textarea": function(evt)
  {
    evt.target.rows = evt.target.value.replace(/[^\n]/g, '').length + 2;
  }
};
Template.en_blogpost.events(templateBlogPostEvents);
Template.blogpost.events(templateBlogPostEvents);


Template.en_postDate.prettyDate = Template.postDate.prettyDate = function() {
  return moment(this.date).format('dddd D MMMM YYYY')
}

Template.en_otherPosts.post = Template.otherPosts.post = function() {
  return blogpostIndex.find({id: {$ne: Session.get('blogpostid')}, title: {$exists: true}}, {limit: 12}).fetch();
}

Template.en_latestComments.comment = Template.latestComments.comment = function() {
  return LatestComments.find({}, { sort: { date: -1 } });
}


Template.en_comment.service = Template.comment.service = function() {
  var user = Meteor.users.findOne({ _id: this.userId });
  if (!user)
    return "";
  for (var p in user.services)
    return p;
}
Template.en_comment.picture = Template.comment.picture = function() {
  return getPictureURL(Meteor.users.findOne({ _id: this.userId }));
}
Template.en_comment.ownsComment = Template.comment.ownsComment = function() {
  return Meteor.userId() === this.userId || (Meteor.user() && Meteor.user().isAdmin);
}
Template.en_comment.datediff = Template.comment.datediff = function() {
  return moment.duration(moment(Session.get("date")).diff(this.date)).humanize();
}

Template.en_blogpost.widthEquals = Template.blogpost.widthEquals =
Template.en_blog.widthEquals = Template.blog.widthEquals = function(width) {
  return this.width == width;
}
Template.en_blogpost.typeIs = Template.blogpost.typeIs = function(type) {
  return this.type == type;
};

function syntaxHighlight() {
  var a = false;

  $('code').each(function() {
    if (!$(this).parent().hasClass('prettyprint')) {
      $(this).wrap('<pre class="prettyprint" />');
      a = true;
    }
  });

  if (a) prettyPrint();
}

function getPictureURL(user) {
  if (!user || !user.services)
    return "http://static.q42.nl/images/employees/anonymous.jpg";
  var services = user.services;
  if (services.twitter)
    return services.twitter.profile_image_url;
  if (services.google)
    return services.google.picture;
  if (services.facebook)
    return "https://graph.facebook.com/" + services.facebook.id + "/picture";
  if (services.github)
    return Gravatar.imageUrl(services.github.email || "");
  return "http://static.q42.nl/images/employees/anonymous.jpg";
}
