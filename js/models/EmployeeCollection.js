import Employee from './Employee.js';

export default class EmployeeCollection {
    constructor(employees = []) {
        this.employees = employees.map(emp => new Employee(emp));
    }

    filterByName(name) {
        return this.employees.filter(emp => emp.name.toLowerCase().includes(name.toLowerCase()));
    }

    filterByRole(role) {
        return this.employees.filter(emp => emp.role === role);
    }

    filterByDepartments(departments) {
        return this.employees.filter(emp => departments.includes(emp.department));
    }

    getAll() {
        return this.employees;
    }
}
