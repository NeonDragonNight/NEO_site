let products = [];

let sortDirection = true;

document.getElementById('main_page').onclick = function() {
        window.location.href = 'index.html';
    }
document.getElementById('nouts').onclick = function() {
        window.location.href = 'nout.html';
    }
document.getElementById('other').onclick = function() {
        window.location.href = 'other.html';
    }
document.getElementById('all_products').onclick = function() {
        window.location.href = 'all.html';
    }

function renderTable(data) {
    const body = document.getElementById('productsBody');
    body.innerHTML = '';
    data.forEach(item => {
        if (item.type == "pc"){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding:12px; border:1px solid #ccc;">${item.name}</td>
                <td style="padding:12px; border:1px solid #ccc;">${item.price} грн</td>
                <td style="padding:12px; border:1px solid #ccc;">${item.quantity}</td>
            `;
            body.appendChild(row);
        }
    });
}

function sortTable(key) {
    products.sort((a, b) => {
        if (a[key] > b[key]) return sortDirection ? 1 : -1;
        if (a[key] < b[key]) return sortDirection ? -1 : 1;
        return 0;
    });
    sortDirection = !sortDirection;
    renderTable(products);
}

document.querySelectorAll('#productsTable th[data-key]').forEach(th => {
    th.addEventListener('click', () => sortTable(th.dataset.key));
});

renderTable(products);

window.addEventListener('DOMContentLoaded', handleFile);

async function handleFile() {
    const response = await fetch('products.xlsx');

    const arrayBuffer = await response.arrayBuffer();

    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    products = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    filteredProducts = [...products];

    renderTable(filteredProducts);
}

function filterByPrice() {
    const name = document.getElementById('searchName').value.toLowerCase();
    const min = Number(document.getElementById('minPrice').value) || 0;
    const max = Number(document.getElementById('maxPrice').value) || Infinity;

    filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(name) &&
        p.price >= min && p.price <= max
    );

    renderTable(filteredProducts);
}

function resetFilter() {
    filteredProducts = [...products];
    document.getElementById('searchName').value = "";
    document.getElementById('minPrice').value = "";
    document.getElementById('maxPrice').value = "";
    renderTable(filteredProducts);
}