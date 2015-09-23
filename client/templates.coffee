$Template

  home:
    num_employees: -> EmployeeCount.findOne()?.count

  header:
    headerGameActive: -> Session.equals "headerGameActive", yes
    dev: -> window.location.href.indexOf("localhost") > -1
