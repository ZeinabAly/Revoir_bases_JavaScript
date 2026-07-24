
// export function filterProducts(products, searchTerm, selectedCategory) {
//     return products.filter(product => {
//         const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true;
//         return matchesSearch && matchesCategory;
//     });
// }

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

export function filterProductsByStock(products, minStock, maxStock) {
    return products.filter(product => {
        const stock = parseInt(product.stock);
        const min = minStock ? parseInt(minStock) : 0;
        const max = maxStock ? parseInt(maxStock) : Infinity;
        return stock >= min && stock <= max;
    });
}


export function applyFilters(products, searchTerm, selectedCategory, minPrice, maxPrice, minStock, maxStock) {
    let filteredProducts = products;

    if (searchTerm) {
        filteredProducts = filterProductsBySearch(filteredProducts, searchTerm);
    }
    if (selectedCategory) {
        filteredProducts = filterProductsByCategory(filteredProducts, selectedCategory);
    }
    if (minPrice || maxPrice) {
        filteredProducts = filterProductsByPrice(filteredProducts, minPrice, maxPrice);
    }
    if (minStock || maxStock) {
        filteredProducts = filterProductsByStock(filteredProducts, minStock, maxStock);
    }
    return filteredProducts;
}