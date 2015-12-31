$Template({
  home: {
    num_employees: () => {
      if (EmployeeCount.findOne()) return EmployeeCount.findOne().count;
    }
  }
});
