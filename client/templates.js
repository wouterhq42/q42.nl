import { $Template } from './lib/_template'
import { EmployeeCount } from '../app/employees/lib/shared'

$Template({
  home: {
    num_employees: () => {
      if (EmployeeCount.findOne()) return EmployeeCount.findOne().count;
    }
  }
});
