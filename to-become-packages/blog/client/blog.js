$Template({
  postDate: {
    prettyDate: function() {
      date = new Date(this.date.replace(" GMT", "").split(" ").join("T") + "Z");
      return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    },
    authorName: function() {
      return this.authorName || "Q42";
    }
  },

  otherPosts: {
    post: () => {
      return blogpostTitles.find({
        id: { $ne: FlowRouter.getParam('id') },
        title: { $exists: true }
      }, { limit: 3 }).fetch();
    },
    firstImage: function() {
      let div = document.createElement('div');
      div.innerHTML = this.intro || this.link_image;
      const img = div.querySelector('img');
      return (img && img.src) || "";
    }
  }
});

Template.blog.helpers({
  tag: () => {
    let tag = FlowRouter.getParam('tag');
    if (tag && tag.indexOf('&' > -1)){
      tag = tag.split('&')[1];
    }
    if (tag === 'en') tag = 'blog';
    return tag;
  }
});

Template.blogpost.helpers({
  post: () => blogpostFull.findOne()
});

Template.blogposts.helpers({
  post: () => blogpostIndex.find({}, {sort: {date: -1}}),
  readmore: () => Session.equals("lang", "en") ? "Read more" : "Lees verder"
});

Template.pageNav.helpers({
  pagination: () => {
    const pageNum = FlowRouter.getParam("pageNum") || 1;
    const tag = FlowRouter.getParam("tag") || "";
    return Utils.getPagination(pageNum, tag);
  },
  tag: () => FlowRouter.getParam("tag")
});
