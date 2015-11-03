PostsWithAuthors = new Mongo.Collection("posts_with_authors");
Meteor.subscribe("posts_with_authors");

$Template({
  home: {
    isByQer(authorName) {
      return (authorName !== 'Rahul Choudhury' && authorName !== 'Q42' &&
          authorName !== 'Ineke Scheffers') ? 'byqer' : '';
    },

    num_employees() {
      if (EmployeeCount.findOne()) return EmployeeCount.findOne().count;
    },

    postWithAuthor() {
      return PostsWithAuthors.find();
    },

    cleanIntro(intro) {
      // XXX: trolololol
      var tag = document.createElement('div');
      tag.innerHTML = intro;
      var txt = tag.innerText;
      txt = txt.substr(0, 150);
      txt = txt.substr(0, Math.min(txt.length, txt.lastIndexOf(" "))) + "...";
      return txt;
    },

    cleanDate(dateString) {
      return dateString.substr(0,dateString.indexOf(' '));
    }
  }
});
