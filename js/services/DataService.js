import EmployeeCollection from '../models/EmployeeCollection.js';

export default class DataService {
    constructor(api) {
        this.api = api;
        this.collection = new EmployeeCollection();
        this.filtered = [];
        this.page = 1;
        this.pageSize = 20;
        this.departments = [];
        this.searchTerm = '';
        this.role = '';
    }

    async loadEmployees() {
        const employees = await this.api.fetchEmployees();
        this.collection = new EmployeeCollection(employees);
        this.filtered = this.collection.getAll();
    }

    filterEmployees() {
        let result = this.collection.getAll();
        if (this.searchTerm) {
            result = result.filter(emp => emp.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
        }
        if (this.role) {
            result = result.filter(emp => emp.role === this.role);
        }
        if (this.departments.length) {
            result = result.filter(emp => this.departments.includes(emp.department));
        }
        this.filtered = result;
        this.page = 1;
    }

    setSearchTerm(term) {
        this.searchTerm = term;
        this.filterEmployees();
    }

    setRole(role) {
        this.role = role;
        this.filterEmployees();
    }

    setDepartments(departments) {
        this.departments = departments;
        this.filterEmployees();
    }

    getVisibleEmployees() {
        const start = (this.page - 1) * this.pageSize;
        return this.filtered.slice(start, start + this.pageSize);
    }

    setPage(page) {
        this.page = page;
    }

    getTotalPages() {
        return Math.ceil(this.filtered.length / this.pageSize);
    }

    getDepartments() {
        return [...new Set(this.collection.getAll().map(emp => emp.department))];
    }
}
