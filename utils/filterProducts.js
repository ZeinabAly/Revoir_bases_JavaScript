import {displayProducts} from "../views/products.js";

import Product from '../models/Product.js';

function displayAucunProduitMessage(filteredProducts) {
   const productList = document.getElementById("productList");

   if (filteredProducts.length === 0) {
      productList.innerHTML = "";
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "Aucun produit trouvé.";
      noResultsMessage.classList.add("no-results-message");
      productList.appendChild(noResultsMessage);
   } else {
      displayProducts(filteredProducts); 
   }
}


// Gerer la barre de recherche
export function filterProductsBySearch(products, searchTerm) {
    return products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
}

// Gérer les filtres a gauche (categories, prix, stock, min/max)
export function filterProductsByCategory(products, selectedCategories) {
    return products.filter(product => {
        return selectedCategories.length === 0 ? true : selectedCategories.includes(parseInt(product.category_id));
    });
}


export function filterProductsByPrice(products, minPrice, maxPrice) {
    return products.filter(product => {
        const price = parseFloat(product.price);
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return price >= min && price <= max;
    });
}

// PAS NECESSAIRE POUR LE MOMENT, MAIS PEUT ETRE UTILE PLUS TARD
export function filterProductsByStock(products, minStock, maxStock) {
    return products.filter(product => {
        const stock = parseInt(product.stock);
        const min = minStock ? parseInt(minStock) : 0;
        const max = maxStock ? parseInt(maxStock) : Infinity;
        return stock >= min && stock <= max;
    });
}

export function filtrerByAvailableStock(products) {
    return products.filter(product =>{
        return product.stock >= 1
    })
}

export function orderByPrice(products, order="asc"){
    return [...products].sort((a,b) => {
        return order === "asc" ? a.price - b.price : b.price - a.price 
    })
}

export function orderByName(products, order="asc"){
    return [...products].sort((a, b) => {
        return order === "asc" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
    })
}

export function applyFilters(products, searchTerm, selectedCategories, minPrice, maxPrice, minStock, maxStock, orderName, orderPrice, inStockOnly) {
    let filteredProducts = products;

    if (searchTerm) {
        filteredProducts = filterProductsBySearch(filteredProducts, searchTerm);
    }
    if (selectedCategories.length > 0) {
        filteredProducts = filterProductsByCategory(filteredProducts, selectedCategories);
    }
    if (minPrice || maxPrice) {
        filteredProducts = filterProductsByPrice(filteredProducts, minPrice, maxPrice);
    }
    if (minStock || maxStock) {
        filteredProducts = filterProductsByStock(filteredProducts, minStock, maxStock);
    }
    if (orderName) {
        const [ , order] = orderName.split("-")
        filteredProducts = orderByName(filteredProducts, order);
    }
    if (inStockOnly) {
        filteredProducts = filtrerByAvailableStock(filteredProducts);
    }
    else{
        const [ , order] = orderPrice.split("-")
        filteredProducts = orderByPrice(filteredProducts, order);
    }
    return filteredProducts;
}


export const filterState = {
   search: "",
   selectedCategories: [],
   minPrice: null,
   maxPrice: null,
   minStock: null,
   maxStock: null,
   orderName: "asc",
   orderPrice: "asc",
   inStockOnly: false,
};

export async function refreshFilteredProducts() {
    // RECUPERER LES DONNEES
    const {data: products} = await Product.getAll();
    const filteredProducts = applyFilters(
      products,
      filterState.search,
      filterState.selectedCategories,
      filterState.minPrice,
      filterState.maxPrice,
      filterState.minStock,
      filterState.maxStock,
      filterState.orderName,
      filterState.orderPrice,
      filterState.inStockOnly,
   );
   displayAucunProduitMessage(filteredProducts);
   updateProductCount(filteredProducts.length);
}

export function resetFilters() {
    filterState.search = "";
    filterState.selectedCategories = [];
    filterState.minPrice = null;
    filterState.maxPrice = null;
    filterState.minStock = null;
    filterState.maxStock = null;
    filterState.orderName = "";
    filterState.orderPrice = "";
    filterState.inStockOnly = false;
}

export function updateProductCount(count) {
    const divProductCount = document.getElementById("product-count");
    divProductCount.innerHTML = count === 0 ? "Aucun produit" : count > 1 ? count + " produits" : count + " produit";  
}
