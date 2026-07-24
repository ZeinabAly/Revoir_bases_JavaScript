import {addProduct, getProduct, getAllProducts, updateProduct, deleteProduct, displayProducts}
 from './src/database/productCRUD.js';

import {getAllCategories, populateCategoriesSelect} from './src/database/categories.js';

import { editProduct } from './src/database/editProductForm.js';

import { addProductModalContent, handleProductSubmit } from './src/database/addProductModalContent.js';

import {handleEditProduct} from './src/database/editProductForm.js';

import {filterProductsBySearch, filterProductsByCategory, filterProductsByPrice, filterProductsByStock} from './src/database/filterProducts.js';



// RECUPERER ET AFFICHER TOUS LES PRODUITS
let products = [];
let filteredProducts = [];

export async function refreshProducts() {
   ({data: products} = await getAllProducts());
   displayProducts(products);
}
// AFFICHER LES PRODUITS AU CHARGEMENT DE LA PAGE
await refreshProducts();

// RECUPERER LES CATEGORIES
let categories = await getAllCategories();

// APPLIQUER LES FILTRES
const searchInputs = document.querySelectorAll(".searchInput");
const categorySelect = document.getElementById("categorySelect");
const priceRange = document.getElementById("priceRange");
const stockCheckbox = document.getElementById("stockCheckbox");


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


searchInputs.forEach(input => {
   input.addEventListener("input", async () => {
      const searchTerm = input.value.toLowerCase();
      filteredProducts = filterProductsBySearch(products, searchTerm);
      // displayProducts(filteredProducts)
      displayAucunProduitMessage(filteredProducts)
   });

});

// LE FILTRE PAR CATEGORIE
const categoryFilters = document.querySelectorAll(".category-filter");


categories.forEach(cat => {
    categoryFilters.forEach(catfilter => {
      catfilter.insertAdjacentHTML(
        "beforeend",`
        <label class="checkbox-row category_check">
            <input
                type="checkbox"
                value="${cat.id}"
                class="category-checkbox h-4 w-4 rounded border-slate-300 bg-white text-amber-500 focus:ring-amber-500 focus:ring-offset-white">
            ${cat.name}
        </label>
        `
    );
    })
});

// GERER LE FILTRE PAR CATEGORIE
categoryFilters.forEach(catfilter => {
   catfilter.addEventListener("change", () => {
      const selectedCategories = Array.from(document.querySelectorAll(".category-checkbox:checked"))
                                       .map(checkbox => parseInt(checkbox.value));
      filteredProducts = filterProductsByCategory(products, selectedCategories);
      displayAucunProduitMessage(filteredProducts);
      console.log(filteredProducts);
      
      
   });
});



                             

// GERER LE BOUTON AJOUTER PRODUIT
// Ouvrir et fermer la modal de product
let btnAddProduct = document.querySelector('.btnAddProduct');
let modal = document.querySelector('.modal');

btnAddProduct.addEventListener("click", () => {
   let modalPanel = document.querySelector('.modal-panel');
   modal.classList.remove("showModal");
   
   modalPanel.innerHTML = addProductModalContent();
   populateCategoriesSelect(categories)

   // FERMETURE DE LA MODALE
   let btnsCloseModal = document.querySelectorAll('.modalClose');
   btnsCloseModal.forEach((btn) => {
      btn.addEventListener("click", () => {
         modal.classList.add("showModal")
      })
   });

   // TRAITEMENT DU FORMULAIRE D'AJOUT
   let addProductForm = document.getElementById("add_product_form");

   addProductForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      let {data: products} = await getAllProducts();
      handleProductSubmit(products);
   })



});


// MODIFIER UN PRODUIT
// EVENT DELEGATION pour les boutons MODIFIER et SUPPRIMER
// (Les boutons sont créés dynamiquement, donc on écoute au niveau du conteneur)
const productList = document.getElementById("productList");

// Etant donné que les données sont chargées via JS, il faut les manipuler après chargement
productList.addEventListener("click", async (e) => {
   const btn = e.target.closest("button");
   
   if (!btn) return; // Si ce n'est pas un bouton, quitter
   
   const action = btn.dataset.action;
   
   const productId = parseInt(btn.dataset.productId);

   
   const modalPanel = document.querySelector(".modal-panel");
   
   if (action === "edit") {
      modal.classList.remove("showModal")
      
      const {data: product} = await getProduct(productId);
      
      
      if (product) {
         const categoryId = parseInt(product.category_id);
         modalPanel.innerHTML = editProduct(product);
         populateCategoriesSelect(categories, categoryId);
         let {data: products} = await getAllProducts();
         await refreshProducts();
      }

      // TRAITEMENT DU FORMULAIRE DE MODIFICATION
      const editProductForm = document.getElementById("edit_product_form");
      editProductForm.addEventListener("submit", async (e) => {
         e.preventDefault();
         await handleEditProduct(product);
      });

      // FERMETURE DE LA MODALE
      let btnsCloseModal = document.querySelectorAll('.modalClose');
      btnsCloseModal.forEach((btn) => {
         btn.addEventListener("click", () => {
            modal.classList.add("showModal")
         })
      });
      
   } else if (action === "delete") {
      console.log("Supprimer le produit :", productId);
      // À implémenter : confirmer et supprimer
      if (confirm("Êtes-vous sûr ?")) {
         deleteProduct(productId);
         let {data: products} = await getAllProducts();
         await refreshProducts();
      }
     
   }


   
});





