export default class PaginationComponent {
    constructor(elementId, dataService) {
        this.el = document.getElementById(elementId);
        this.dataService = dataService;
        window.addEventListener('dataChanged', () => this.render());
    }

    render() {
        const totalPages = this.dataService.getTotalPages();
        const currentPage = this.dataService.page;
        let html = '<div class="pagination">';
        for (let i = 1; i <= totalPages; i++) {
            html += `<button ${i === currentPage ? 'disabled' : ''} data-page="${i}">${i}</button>`;
        }
        html += '</div>';
        this.el.innerHTML = html;
        this.el.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', e => {
                this.dataService.setPage(Number(btn.dataset.page));
                window.dispatchEvent(new Event('dataChanged'));
            });
        });
    }
}
