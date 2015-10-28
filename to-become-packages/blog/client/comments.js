Template.comments.helpers({
  picture: () => Utils.getPictureURL(Meteor.user())
});

// all of these events relate to comments, so only on NL site
Template.comments.events({
  "click #addComment": () => {
    const comm = $("#comment")[0].value;
    if (comm) Meteor.call("addComment", Session.get("blogpostid"), comm);
    $("#comment")[0].value = "";
  }
});

Template.comment.onCreated(function() {
  this.editing = new ReactiveVar(false);
  this.numRows = new ReactiveVar(3);
  this.date = new ReactiveVar(new Date);
  Meteor.setInterval( ( () => this.date.set(new Date()) ), 1000);
});

// only on NL site
Template.comment.helpers({
  service: function() {
    const user = Meteor.users.findOne({_id: this.userId});
    if (!user) return "";
    for (let p in user.services){
      // ****** what do we do with the p's here? return them? in what format? *****
      return p;
    }
  },
  picture: function() {
    return Utils.getPictureURL( Meteor.users.findOne({_id: this.userId}) );
  },
  ownsComment: function() {
    return (Meteor.userId() === this.userId) ||
           (Meteor.user() && Meteor.user().isAdmin);
  },
  datediff: function() {
    const date = new Date(this.date);
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  },
  textAsHTML: function() {
    return this.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>");
  },
  editing: () => Template.instance().editing.get(),
  numRows: () => Template.instance().numRows.get()
});

Template.comment.events({
  "click .edit-comment": (evt, tmpl) => tmpl.editing.set(true),

  "click .save-comment": function(evt, tmpl) {
    tmpl.editing.set(false);
    Meteor.call("updateComment", this._id, tmpl.$(".edit-area")[0].value);
  },

  "click .delete-comment": function(evt) {
    Meteor.call("deleteComment", this._id);
  },

  "keyup textarea": (evt, tmpl) => {
    tmpl.numRows.set(evt.target.value.replace(/[^\n]/g, '').length + 2);
  }
});
