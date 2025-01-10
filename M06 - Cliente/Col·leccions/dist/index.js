"use strict";
let categories = new Set();
let products = new Set();
let stock = new Map();
let sales = new Map();
/**
 * Section de categorias
 */
function afegirCategoria() {
    let category = document.getElementById("categoriaInput").value;
    categories.add(category);
}
function mostrarCategories() {
    let categoriesDiv = document.getElementById("llistaCategories") || document.createElement('div');
    categoriesDiv.innerHTML = '';
    categoriesDiv.id = "llistaCategories";
    document.body.appendChild(categoriesDiv);
    categories.forEach(category => {
        let p = document.createElement("p");
        p.textContent = category;
        categoriesDiv.appendChild(p);
    });
}
/**
 * Section de productos
 */
function afegirProducte() {
    let productName = document.getElementById("productoInput").value;
    let stockInput = document.getElementById("stockInput").value;
    let productStock = stockInput ? parseInt(stockInput, 10) : 1; // Default stock to 1 if input is empty or invalid.
    if (isNaN(productStock)) {
        productStock = 1;
    }
    if (productName.trim() !== "") {
        products.add(productName);
        stock.set(productName, productStock);
    }
    else {
        alert("Stock invalido");
    }
}
function eliminarProducte() {
    let productName = document.getElementById("productoInput").value;
    products.delete(productName);
    stock.delete(productName);
}
function mostrarProducte() {
    let productsDiv = document.getElementById("llistaProductes") || document.createElement('div');
    productsDiv.innerHTML = '';
    productsDiv.id = "llistaProductes";
    document.body.appendChild(productsDiv);
    products.forEach(product => {
        let p = document.createElement("p");
        p.textContent = `${product} - ${stock.get(product)}`;
        productsDiv.appendChild(p);
    });
}
/**
 * Section de ventas
 */
function vendreProducte() {
    let productName = document.getElementById("vendreProducteInput").value;
    let priceInput = document.getElementById("preuVendaInput").value;
    let price = parseFloat(priceInput);
    // Validació de dades
    if (!productName || !products.has(productName)) {
        alert("Error: El producte no existeix.");
        return;
    }
    if (isNaN(price) || price <= 0) {
        alert("Error: Introdueix un preu vàlid.");
        return;
    }
    let currentStock = stock.get(productName) || 0;
    if (currentStock <= 0) {
        alert("Error: No hi ha stock suficient.");
        return;
    }
    if (currentStock === 1) {
        products.delete(productName);
        stock.delete(productName);
    }
    else {
        stock.set(productName, currentStock - 1);
    }
    if (!sales.has(productName)) {
        sales.set(productName, 0);
    }
    sales.set(productName, (sales.get(productName) || 0) + price);
    mostrarProducte();
    mostrarVendes();
    function mostrarVendes() {
        let salesDiv = document.getElementById("llistaVendes") || document.createElement('div');
        salesDiv.innerHTML = '';
        salesDiv.id = "llistaVendes";
        document.body.appendChild(salesDiv);
        sales.forEach((amount, product) => {
            let p = document.createElement("p");
            p.textContent = `${product}: €${amount.toFixed(2)}`;
            salesDiv.appendChild(p);
        });
    }
}
function mostrarResumVendes() {
    let salesDiv = document.getElementById("resumVendes") || document.createElement('div');
    salesDiv.innerHTML = '';
    salesDiv.id = "resumVendes";
    document.body.appendChild(salesDiv);
    let sortedSales = Array.from(sales.entries()).sort((a, b) => b[1] - a[1]);
    let totalBenefits = 0;
    sortedSales.forEach(([product, amount]) => {
        totalBenefits += amount;
        let p = document.createElement("p");
        p.textContent = `${product}: €${amount.toFixed(2)}`;
        salesDiv.appendChild(p);
    });
    let totalDiv = document.createElement("p");
    totalDiv.textContent = `Beneficis totals: €${totalBenefits.toFixed(2)}`;
    totalDiv.style.fontWeight = "bold";
    salesDiv.appendChild(totalDiv);
}
