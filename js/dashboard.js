function searchUsers() {
    const input = document.getElementById('userSearch');
    const filter = input.value.toLowerCase();
    const table = document.querySelector('table tbody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j]) {
                const txtValue = cells[j].textContent || cells[j].innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        rows[i].style.display = found ? "" : "none";
    }
}

function showAllUsers() {
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        row.style.display = "";
    });
    resetFilterButtonStyles();
}

function showVendors() {
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        const typeCell = row.cells[1];
        row.style.display = typeCell && typeCell.textContent === "Vendor" ? "" : "none";
    });
    resetFilterButtonStyles();
}

function showStaff() {
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        const typeCell = row.cells[1];
        row.style.display = typeCell && typeCell.textContent === "Staff" ? "" : "none";
    });
    resetFilterButtonStyles();
}

function exportToCSV() {
    const users = [
        { name: "Ketan Mhatre", type: "Vendor", email: "test@test.com", phone: "0123456789" },
    ];

    const csvRows = [];
    const headers = Object.keys(users[0]);
    csvRows.push(headers.join(','));

    for (const user of users) {
        const values = headers.map(header => JSON.stringify(user[header], replacer)).join(',');
        csvRows.push(values);
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'users.csv');
    a.click();
    URL.revokeObjectURL(url);
}

function replacer(key, value) {
    return value === null ? '' : value;
}
let currentPage = 1;
let resultsPerPage = 8;

function initializePagination() {
    currentPage = 1;
    const paginationButtons = document.querySelectorAll('.pn');
    paginationButtons.forEach((button) => {
        button.classList.remove('bg-[var(--primary-color)]', 'text-white');
        button.classList.add('bg-red-100', 'text-red-500');

        if (button.textContent.trim() === "1") {
            button.classList.add('bg-[var(--primary-color)]', 'text-white');
        } else {
            button.classList.add('text-black');
        }
    });
}

function changePage(page) {
    currentPage = page;
    console.log(`Displaying page ${currentPage} with ${resultsPerPage} results per page.`);

    const paginationButtons = document.querySelectorAll('.pn');
    paginationButtons.forEach((button) => {
        button.classList.remove('bg-[var(--primary-color)]', 'text-white');
        button.classList.add('bg-red-100', 'text-red-500');

        if (button.textContent.trim() === String(currentPage)) {
            button.classList.add('bg-[var(--primary-color)]', 'text-white');
        } else {
            button.classList.add('text-black');
        }
    });
}

document.addEventListener('DOMContentLoaded', initializePagination);

function updateResultsPerPage() {
    const select = document.getElementById('resultsPerPage');
    resultsPerPage = parseInt(select.value);
    console.log(`Results per page updated to ${resultsPerPage}.`);
}

function resetFilterButtonStyles() {
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.classList.remove('bg-[var(--primary-color)]', 'text-white');
        button.classList.add('bg-[var(--primary-color)]', 'text-white-500');
    });
}