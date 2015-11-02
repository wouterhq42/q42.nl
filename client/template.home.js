Template.home.helpers({
  gravatar: (email) => {
    return Gravatar.imageUrl(email);
  },

  isByQer: (authorName) => {
    return (authorName !== 'Rahul Choudhury' && authorName !== 'Q42' &&
        authorName !== 'Ineke Scheffers') ? 'byqer' : '';
  },
  num_employees: () => {
    if (EmployeeCount.findOne()) return EmployeeCount.findOne().count;
  },
  post: function() {
    return blogpostIndex.find({}, {
      sort: {
        date: -1
      }
    });
  }
});
