import ProductController from "./controllers/ProductController.js";
import { addProductModalContent, readCreateForm } from "./views/createProduct.js";

// Récupérer tous les produits
const getAllProducts = ProductController.getAll;
getAllProducts();


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
        const data = readCreateForm(addProductForm);
        const result = await productController.create(data);
        if (result.success) resetCreateForm(addProductForm);
   })

});


// CREER UN NOUVEAU PRODUIT
