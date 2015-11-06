Template.comments.onCreated(function() {
  this.subscribe("blogComments", FlowRouter.getParam("id"));
});

Template.comments.helpers({
  picture: () => Utils.getPictureURL(Meteor.user()),
  commentsCount: () => BlogComments.find().count(),
  oneComment: () => BlogComments.find().count() === 1,
  comments: () => BlogComments.find()
});

// all of these events relate to comments, so only on NL site
Template.comments.events({
  "click #addComment": () => {
    let $input = $("#comment-input");
    const comm = $input.val();
    if (comm) Meteor.call("addComment", FlowRouter.getParam("id"), comm);
    $input[0].value = "";
  }
});

Template.comment.onCreated(function() {
  this.editing = new ReactiveVar(false);
  this.numRows = new ReactiveVar(3);
  this.date = new ReactiveVar(new Date());
  Meteor.setInterval( ( () => this.date.set(new Date()) ), 1000);
});

// only on NL site
Template.comment.helpers({
  service() {
    const user = Meteor.users.findOne({_id: this.userId});
    if (!user) return "";
    return _.first(_.compact(_.values(user.services)));
  },
  picture() {
    return Utils.getPictureURL( Meteor.users.findOne({_id: this.userId}) );
  },
  ownsComment() {
    return (Meteor.userId() === this.userId) ||
           (Meteor.user() && Meteor.user().isAdmin);
  },
  datediff() {
    const date = new Date(this.date);
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  },
  textAsHTML() {
    return this.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>");
  },
  editing: () => Template.instance().editing.get(),
  numRows: () => Template.instance().numRows.get()
});

Template.comment.events({
  "click .edit-comment": (evt, tmpl) => tmpl.editing.set(true),

  "click .save-comment"(evt, tmpl) {
    tmpl.editing.set(false);
    Meteor.call("updateComment", this._id, tmpl.$(".edit-area")[0].value);
  },

  "click .delete-comment"(evt) {
    Meteor.call("deleteComment", this._id);
  },

  "keyup textarea": (evt, tmpl) => {
    tmpl.numRows.set(evt.target.value.replace(/[^\n]/g, '').length + 2);
  }
});
