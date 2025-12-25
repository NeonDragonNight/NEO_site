let products = [];
//    { name: "Игровой ноутбук", price: 35000, quantity: 12 },
//    { name: "Стационарный ПК", price: 28500, quantity: 7 },
//    { name: "Видеокарта RTX 4060", price: 19000, quantity: 25 }
//];

let sortDirection = true;

document.getElementById('main_page').onclick = function() {
        window.location.href = 'index.html';
    }
document.getElementById('all_products').onclick = function() {
        window.location.href = 'all.html';
    }
document.getElementById('pc').onclick = function() {
        window.location.href = 'pc.html';
    }
document.getElementById('other').onclick = function() {
        window.location.href = 'other.html';
    }

function renderTable(data) {
    const body = document.getElementById('productsBody');
    body.innerHTML = '';
    data.forEach(item => {
        if (item.type == "nout"){
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


//######################################


//document.getElementById('excelFile').addEventListener('change', handleFile, false);

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

    //const file = event.target.files[0];
    //if (!file) return;

    //const reader = new FileReader();

    //reader.onload = function (e) {
        //const data = new Uint8Array(e.target.result);
        //const workbook = XLSX.read(data, { type: 'array' });

        // Перший лист
        //const sheetName = workbook.SheetNames[0];
        //const worksheet = workbook.Sheets[sheetName];

        // XLSX → JSON
        //products = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        // приклад: вивід у таблицю
        //renderTable(products);
    //};

    //reader.readAsArrayBuffer(file);
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