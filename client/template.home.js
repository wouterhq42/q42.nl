Meteor.startup(() => Meteor.subscribe("employees"));

Template.home.helpers({
  isByQer: (authorName) => {
    return (authorName !== 'Rahul Choudhury' && authorName !== 'Q42' &&
        authorName !== 'Ineke Scheffers') ? 'byqer' : '';
  },

  num_employees: () => {
    if (EmployeeCount.findOne()) return EmployeeCount.findOne().count;
  },

  postWithAuthor: () => {
    let postsWithAuthor = [];
    const posts = blogpostIndex.find({}, { sort: { date: -1 } });
    posts.forEach((p) => {
      postsWithAuthor.push({ post: p, author: Employees.findOne({ name: p.authorName })});
    });
    return postsWithAuthor;
  }
});
