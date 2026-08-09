import ProductController from "./controllers/ProductController.js";
import CategoryController from "./controllers/CategoryController.js";
import { addProductModalContent, readCreateForm, resetCreateForm } from "./views/createProduct.js";
import { populateCategoriesSelect, populateCategoriesFilter } from "./views/categories/populateCategoriesContent.js";
import DBSeed from "./config/DBSeed.js";
import { createCategories } from "./Factory/CategoryFactory.js";
import { createProducts } from "./Factory/ProductFactory.js";
import {refreshFilteredProducts, filterState, resetFilters, updateProductCount} from "./utils/filterProducts.js";
import { displayProducts } from "./views/products.js";
import Product from "./models/Product.js";
import { editProduct } from "./views/editProductForm.js";
import { readEditForm } from "./views/editProductForm.js";



// PEUPLER LA BASE DE DONNEES SI JAMAIS ELLE EST VIDE 
await DBSeed.applyFactory("categories", createCategories);
await DBSeed.applyFactory("products", createProducts);


let products = [];
export async function refreshProducts() {
   ({data: products} = await Product.getAll());
   displayProducts(products);
   updateProductCount(products.length);
}




// Récupérer tous les produits
const getAllProducts = ProductController.getAll;
getAllProducts();

const categories = await CategoryController.getAll();



// GERER LE BOUTON AJOUTER PRODUIT
// Ouvrir et fermer la modal de product
let btnAddProduct = document.querySelector('.btnAddProduct');
let modal = document.querySelector('.modal');

btnAddProduct.addEventListener("click", () => {
   let modalPanel = document.querySelector('.modal-panel');
   modal.classList.remove("showModal");
   
   modalPanel.innerHTML = addProductModalContent();
   populateCategoriesSelect(categories);

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
        const data = readCreateForm(addProductForm);
        const result = await ProductController.create(data);
        if (result.success) resetCreateForm(addProductForm);
   })

});


// AFFICHER LA LISTE DES CATEGORIES DANS LES FILTRES
populateCategoriesFilter(categories);



// APPLIQUER LES FILTRES SUR LES PRODUITS
export const searchInputs = document.querySelectorAll(".searchInput");
const categorySelect = document.getElementById("categorySelect");
const priceRange = document.getElementById("priceRange");
const stockCheckbox = document.getElementById("stockCheckbox");



searchInputs.forEach(input => {
   input.addEventListener("input", async (e) => {
      filterState.search = e.target.value.toLowerCase();
      refreshFilteredProducts();
   });

});

// LE FILTRE PAR CATEGORIE
const categoryFilters = document.querySelectorAll(".category-filter");


// GERER LE FILTRE PAR CATEGORIE
categoryFilters.forEach(catfilter => {
   catfilter.addEventListener("change", () => {
      filterState.selectedCategories = Array.from(document.querySelectorAll(".category-checkbox:checked"))
                                       .map(checkbox => parseInt(checkbox.value));
   
      refreshFilteredProducts();
   });
});


// FILTRE DE PRIX
let minPriceInputs = document.querySelectorAll('.minPrice');
let maxPriceInputs = document.querySelectorAll('.maxPrice');
let minPrice = 0;
let maxPrice = Infinity;


minPriceInputs.forEach((min) => {
   min.addEventListener("input", (e) => {      
      filterState.minPrice = e.target.value;
      refreshFilteredProducts();
   })
});
maxPriceInputs.forEach(max => {
   max.addEventListener("input", (e) => {
      filterState.maxPrice = e.target.value;
      refreshFilteredProducts();
   })
});

let sortSelects = document.querySelectorAll('select[name="tri"]');

// ORDRE CROISSANT ET DECROISSANT (NOM ET PRIX)
sortSelects.forEach(sortSelect => {
   sortSelect.addEventListener("change", (e) => {
      const [field, order] = e.target.value.split("-"); // ["prix", "asc"]
   
      if(field === "nom"){
         filterState.orderName = e.target.value;
         refreshFilteredProducts();
      }else{
         filterState.orderPrice = e.target.value;
         refreshFilteredProducts();
      }
   });
})

// FILTRE PAR STOCK
const stockFilters = document.querySelectorAll(".enStock");

stockFilters.forEach(stockFilter => {
   stockFilter.addEventListener("change", () => {
      filterState.inStockOnly = stockFilter.checked;
      refreshFilteredProducts();
   });
});

// REINITIALISER LES FILTRES
const btnResetFilters = document.getElementById("resetFilters");

btnResetFilters.addEventListener("click", ()=>{
   resetFilters();
    document.querySelectorAll(".category-checkbox").forEach(cb => cb.checked = false);

   // interface — vider les champs recherche et prix
   searchInputs.forEach(input => input.value = "");
   minPriceInputs.forEach(input => input.value = "");
   maxPriceInputs.forEach(input => input.value = "");

   // interface — remettre les <select> de tri sur leur première option
   sortSelects.forEach(select => select.selectedIndex = 0);
   refreshFilteredProducts();
})


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
      
      const {data: product} = await Product.getById(productId);
      
      
      if (product) {
         const categoryId = parseInt(product.category_id);
         modalPanel.innerHTML = editProduct(product);
         populateCategoriesSelect(categories, categoryId);
         await refreshProducts();
      }

      // // TRAITEMENT DU FORMULAIRE DE MODIFICATION
      const editProductForm = document.getElementById("edit_product_form");
      
      editProductForm.addEventListener("submit", async (e) => {
         e.preventDefault();
         const data = readEditForm(product, editProductForm);
         await ProductController.update(product.id, data);
        
      });

      // // FERMETURE DE LA MODALE
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
         await Product.delete(productId);
         await refreshProducts();
      }
     
   }


   
});



