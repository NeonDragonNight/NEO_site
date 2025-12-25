let products = [];
let sortDirection = true;
let filteredProducts = [];



function renderTable(data) {
    const body = document.getElementById('productsBody');
    body.innerHTML = '';
    data.forEach(item => {
        if (item.type > ""){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding:12px; border:1px solid #ccc;">${item.name}</td>
                <td style="padding:12px; border:1px solid #ccc;">${item.price} грн</td>
                <td style="padding:12px; border:1px solid #ccc;">${item.quantity}</td>
                <td style="padding:12px; border:1px solid #ccc; text-align:center;">
                    <button class="order-btn" onclick='openOrderModal(${JSON.stringify(item)})'>Замовити</button>
                </td>
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


//###############################

// 🔍 фільтр за ціною
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

// ♻️ скидання фільтра
function resetFilter() {
    filteredProducts = [...products];
    document.getElementById('searchName').value = "";
    document.getElementById('minPrice').value = "";
    document.getElementById('maxPrice').value = "";
    renderTable(filteredProducts);
}

//###############################
let selectedProduct = null;

function openOrderModal(item) {
  selectedProduct = item;

  document.getElementById("productInfo").innerText =
    `Товар: ${item.name}, Ціна: ${item.price} грн`;

  document.getElementById("orderModal").style.display = "block";
}

function closeOrderModal() {
  document.getElementById("orderModal").style.display = "none";
}

//###############################
function showtest() {sessionStorage.setItem("filter", "pc");
    window.location.href = "all.html";
}

function showDetails(name, price, quantity) {
alert(`Название: ${name}
Цена: ${price} грн
Количество: ${quantity}`);
}

function showDetails2(item) {
alert(`Название: ${item.name}
Цена: ${item.price} грн
Количество: ${item.quantity}`);
}