export default class EmployeeAPI {
    constructor() {
        this.apiUrl = 'https://dummy.restapiexample.com/api/v1/employees';
    }

    async fetchEmployees() {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data.data.map(emp => ({
            id: emp.id,
            name: emp.employee_name,
            salary: emp.employee_salary,
            age: emp.employee_age,
            department: ['HR', 'Engineering', 'Sales', 'Marketing'][Math.floor(Math.random()*4)],
            role: ['Manager', 'Developer', 'Analyst', 'Designer'][Math.floor(Math.random()*4)]
        }));
    }
    async updateEmployee(id, updatedData) {
        return Promise.resolve({ success: true });
    }
}
