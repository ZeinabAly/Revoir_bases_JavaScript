






// AFFICHER LES PRODUITS AU CHARGEMENT DE LA PAGE
displayProducts(products);
// modalPanel.innerHTML = addProductModalContent();
// populateCategoriesSelect(categories);






// MODIFIER UN PRODUIT
// EVENT DELEGATION pour les boutons MODIFIER et SUPPRIMER
// (Les boutons sont créés dynamiquement, donc on écoute au niveau du conteneur)
const productList = document.getElementById("productList");

// Etant donné que les données sont chargées via JS, il faut les manipuler après chargement
productList.addEventListener("click", (e) => {
   const btn = e.target.closest("button");
   
   if (!btn) return; // Si ce n'est pas un bouton, quitter
   
   const action = btn.dataset.action;
   const productId = btn.dataset.productId;
   const modalPanel = document.querySelector(".modal-panel");
   
   if (action === "edit") {
      modal.classList.remove("showModal")
      const product = products.find(p => p.id === productId);
      if (product) {
         modalPanel.innerHTML = editProduct(product);
         populateCategoriesSelect(categories);
      }
   } else if (action === "delete") {
      console.log("Supprimer le produit :", productId);
      // À implémenter : confirmer et supprimer
      if (confirm("Êtes-vous sûr ?")) {
         deleteProduct(productId);
      }
   }
});

