Meteor.startup(() => Meteor.subscribe("employees"));

Template.home.helpers({
  gravatar: (authorName) => {
    const qer = Employees.findOne({ name: authorName });
    if (qer)
      return Gravatar.imageUrl(qer.handle + "@q42.nl");
    else {
      return null;
    }
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
  },

  cleanIntro: (intro) => {
    var tag = document.createElement('div');
    tag.innerHTML = intro;
    var txt = tag.innerText;
    txt = txt.substr(0, 150);
    txt = txt.substr(0, Math.min(txt.length, txt.lastIndexOf(" "))) + "...";
    return txt;
  },

  cleanDate: (dateString) => {
    return dateString.substr(0,dateString.indexOf(' '));
  }

});
