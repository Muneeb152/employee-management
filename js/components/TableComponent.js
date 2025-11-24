export default class TableComponent {
    constructor(elementId, dataService) {
        this.el = document.getElementById(elementId);
        this.dataService = dataService;
        window.addEventListener('dataChanged', () => this.render());
    }

    render() {
        const employees = this.dataService.getVisibleEmployees();
        this.el.innerHTML = `<table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Age</th>
                    <th>Department</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                ${employees.map(emp => `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${emp.salary}</td>
                        <td>${emp.age}</td>
                        <td>${emp.department}</td>
                        <td>${emp.role}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>`;
    }
}
