window.blogpostFull = new Mongo.Collection("blogpostFull");
window.blogpostIndex = new Mongo.Collection("blogpostIndex");
window.LatestComments = new Mongo.Collection("LatestComments");

$Template({
  blog: {
    rendered: function() {
      syntaxHighlight();
    },
    widthEquals: function(width) {
      return this.width == width;
    },
    typeIs: function(type) {
      return this.type == type;
    }
  },
  blogpost: {
    rendered: function() {
      syntaxHighlight();
    },
    loggedin: function() {
      return !!Meteor.user();
    },
    events: {
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
    },
    picture: function() {
      return getPictureURL(Meteor.user());
    },
    widthEquals: function(width) {
      return this.width == width;
    },
    typeIs: function(type) {
      return this.type == type;
    }
  },
  postDate: {
    prettyDate: function() {
      var date = this.date.replace(" GMT", "").split(" ").join("T") + "Z";
      return moment(new Date(date)).format('dddd D MMMM YYYY')
    }
  },
  otherPosts: {
    post: function() {
      return blogpostIndex.find({id: {$ne: Session.get('blogpostid')}, title: {$exists: true}}, {limit: 12}).fetch();
    }
  },
  latestComments: {
    comment: function() {
      return LatestComments.find({}, { sort: { date: -1 } });
    }
  },
  comment: {
    service: function() {
      var user = Meteor.users.findOne({ _id: this.userId });
      if (!user)
        return "";
      for (var p in user.services)
        return p;
    },
    picture: function() {
      return getPictureURL(Meteor.users.findOne({ _id: this.userId }));
    },
    ownsComment: function() {
      return Meteor.userId() === this.userId || (Meteor.user() && Meteor.user().isAdmin);
    },
    datediff: function() {
      return moment.duration(moment(Session.get("date")).diff(this.date)).humanize();
    },
    textAsHTML: function() {
      return this.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>");
    }
  }
});

function syntaxHighlight() {
  var a = false;

  $('code').each(function() {
    if (!$(this).parent().hasClass('prettyprint') && $(this).parent().is("pre")) {
      $(this).parent().addClass("prettyprint");
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
