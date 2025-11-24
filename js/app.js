import EmployeeAPI from './api/EmployeeAPI.js';
import DataService from './services/DataService.js';
import TableComponent from './components/TableComponent.js';
import SearchComponent from './components/SearchComponent.js';
import PaginationComponent from './components/PaginationComponent.js';
import { exportToCSV, exportToJSON } from './utils/helpers.js';

const api = new EmployeeAPI();
const dataService = new DataService(api);

const tableComponent = new TableComponent('table-component', dataService);
const searchComponent = new SearchComponent('search-component', dataService);
const paginationComponent = new PaginationComponent('pagination-component', dataService);

const exportDiv = document.getElementById('export-component');
const csvBtn = document.createElement('button');
csvBtn.textContent = 'Export CSV';
csvBtn.onclick = () => exportToCSV(dataService.getVisibleEmployees());
const jsonBtn = document.createElement('button');
jsonBtn.textContent = 'Export JSON';
jsonBtn.onclick = () => exportToJSON(dataService.getVisibleEmployees());
exportDiv.appendChild(csvBtn);
exportDiv.appendChild(jsonBtn);

(async () => {
    await dataService.loadEmployees();
    tableComponent.render();
    paginationComponent.render();
})();
