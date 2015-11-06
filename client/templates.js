$Template({
  home: {
    num_employees: () => {
      if (EmployeeCount.findOne()) return EmployeeCount.findOne().count;
    }
  },
  header: {
    dev: () => window.location.href.indexOf("localhost") > -1
  }
});
