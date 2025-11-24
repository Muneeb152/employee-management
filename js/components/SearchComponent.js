export default class SearchComponent {
    constructor(elementId, dataService) {
        this.el = document.getElementById(elementId);
        this.dataService = dataService;
        this.render();
    }

    render() {
        this.el.innerHTML = `
            <input type="text" id="search-input" placeholder="Search by name..." />
            <select id="role-select">
                <option value="">All Roles</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Analyst">Analyst</option>
                <option value="Designer">Designer</option>
            </select>
            <div id="department-filters"></div>
        `;
        document.getElementById('search-input').addEventListener('input', e => {
            this.dataService.setSearchTerm(e.target.value);
            window.dispatchEvent(new Event('dataChanged'));
        });
        document.getElementById('role-select').addEventListener('change', e => {
            this.dataService.setRole(e.target.value);
            window.dispatchEvent(new Event('dataChanged'));
        });
        this.renderDepartmentFilters();
    }

    renderDepartmentFilters() {
        const departments = this.dataService.getDepartments();
        const container = document.getElementById('department-filters');
        container.innerHTML = departments.map(dep => `
            <label><input type="checkbox" value="${dep}" class="dept-filter" /> ${dep}</label>
        `).join(' ');
        container.querySelectorAll('.dept-filter').forEach(cb => {
            cb.addEventListener('change', () => {
                const selected = Array.from(container.querySelectorAll('.dept-filter:checked')).map(cb => cb.value);
                this.dataService.setDepartments(selected);
                window.dispatchEvent(new Event('dataChanged'));
            });
        });
    }
}
