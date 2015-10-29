Template.home.helpers({
  gravatar: (email) => {
    return Gravatar.imageUrl(email);
  },

  isByQer: (authorName) => {
    return (authorName !== 'Rahul Choudhury' && authorName !== 'Q42' &&
        authorName !== 'Ineke Scheffers') ? 'byqer' : '';
  }
});
