$Template({
  home: {
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
  },
  header: {
    headerGameActive: () => Session.equals("headerGameActive", true),
    dev: () => window.location.href.indexOf("localhost") > -1
  }
});


Template.hero.helpers({
});
