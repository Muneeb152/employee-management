export function exportToCSV(data) {
    const csv = [Object.keys(data[0]).join(',')].concat(
        data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'employees.csv';
    a.click();
}

export function exportToJSON(data) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'employees.json';
    a.click();
}
