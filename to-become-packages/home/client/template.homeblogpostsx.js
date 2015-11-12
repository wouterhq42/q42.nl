PostsWithAuthors = new Mongo.Collection("posts_with_authors");

Template.homeBlogposts.helpers({
  num_employees() {
    if (EmployeeCount.findOne()) return EmployeeCount.findOne().count;
  },

  postWithAuthor() {
    return PostsWithAuthors.find({}, {limit: 3});
  },

  englishPostWithAuthor() {
    return PostsWithAuthors.find({tags: 'en'}, {limit: 3});
  }
});

Template.postWithAuthorTemplate.helpers({
  isByQer(authorName) {
    return (authorName !== 'Rahul Choudhury' && authorName !== 'Q42' &&
        authorName !== 'Ineke Scheffers') ? 'byqer' : '';
  },

  cleanIntro(intro) {
    // XXX: trolololol
    let tag = document.createElement('div');
    tag.innerHTML = intro;
    let txt = tag.innerText;
    txt = txt.substr(0, 150);
    txt = txt.substr(0, Math.min(txt.length, txt.lastIndexOf(" ")));
    if (txt)
      return txt + "...";
    return "";
  },

  cleanImg(intro) {
    // XXX: trolololol
    let div = document.createElement('div');
    div.innerHTML = intro;
    let img = div.querySelector('img');
    if (img)
      return img.src;
    return "";
  }
});
