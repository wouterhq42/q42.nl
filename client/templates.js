$Template({
  home: {
    num_employees: () => {
      if (EmployeeCount.findOne()) return EmployeeCount.findOne().count;
    }
  },
  header: {
    headerGameActive: () => Session.equals("headerGameActive", true),
    dev: () => window.location.href.indexOf("localhost") > -1
  }
});
