// import { showNotification } from "./addProductModalContent.js";
import Product from "../models/Product.js";
import {refreshProducts} from "./../../app.js"


export function editProduct(product) {
    return `
    <div class="">
      <div id="notifContent"></div>
      <div class="mb-5 flex items-center justify-between">
        <h2 class="font-display text-lg font-semibold text-slate-900">Modifier le produit</h2>
        <button type="button" class="modal-close modalClose" aria-label="Fermer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <form class="space-y-4" id="edit_product_form" data-product-id="${product.id}">
        <div>
          <label class="label" for="product-name">Nom du produit</label>
          <input id="product-name" name="name" type="text" class="input" value="${product.name || ''}">
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label" for="product-category">Catégorie</label>
            <select id="product-category" name="category" class="input modal_categories">
              <option value="">Sélectionner une catégorie</option>
            </select>
          </div>
          <div>
            <label class="label" for="product-price">Prix (€)</label>
            <input id="product-price" name="price" type="number" min="0" step="0.01" class="input" value="${product.price || ''}">
          </div>
        </div>

        <div>
          <label class="label" for="product-image">Image du produit</label>
          <input id="product-image" name="image" type="file" class="input">
        </div>

        <div>
          <label class="label" for="product-description">Description</label>
          <textarea id="product-description" name="description" rows="3" class="input resize-none">${product.description || ''}</textarea>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="modalClose inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200">Annuler</button>
          <button type="submit" class="btn-primary">Enregistrer</button>
        </div>
      </form>
    </div>
    `;
}

export function readEditForm(product, form){
  const formData = new FormData(form);
  
  // Gerer le nom
  let name = product.name;
  if(formData.get("name")) name = formData.get("name").trim();
  
  // Gerer la description
  let description = product.description;
  if(formData.get("description")) description = formData.get("description").trim();

  // Gerer category
  let category = product.category_id;
  if(formData.get("category")) category = Number(formData.get("category"));
  
  // Gerer prix
  let price = product.price;
  if(formData.get("price")) price = Number(formData.get("price"));
  
  // Gestion de l'image
  let imageFile = product.image;

  const newImage = formData.get("image");

  if (newImage && newImage.size > 0) {
      // Libérer l'ancienne URL si elle existe
      if (product.image) {
          URL.revokeObjectURL(product.image);
      }

      imageFile = newImage;
  }

  return {
    id: product.id,
    name: name,
    category_id: category,
    price: price,
    image: imageFile,
    description: description
  };
}

// export async function handleEditProduct(product) {
//     const editProductForm = document.getElementById("edit_product_form");

//     const formData = new FormData(editProductForm);

//     // Validation
//     if (
//         !formData.get("name") ||
//         !formData.get("category") ||
//         !formData.get("price")
//     ) {
//         alert("Veuillez remplir tous les champs obligatoires.");
//         return;
//     }

//     if (formData.get("name").trim().length < 3) {
//         alert("Le nom doit comporter au moins 3 caractères.");
//         return;
//     }

//     // Gestion de l'image
//     let imageFile = product.image;

//     const newImage = formData.get("image");

//     if (newImage && newImage.size > 0) {
//         // Libérer l'ancienne URL si elle existe
//         if (product.image) {
//             URL.revokeObjectURL(product.image);
//         }

//         imageFile = newImage;
//     }

//     try {

//         const updatedProduct = await updateProduct({
//             id: product.id,
//             name: formData.get("name").trim(),
//             category_id: Number(formData.get("category")),
//             price: Number(formData.get("price")),
//             image: imageFile,
//             description: formData.get("description")
//         });
        

//         showNotification(updatedProduct.message, "success");

//         // Recharger la liste
//         const { data: products } = await getAllProducts();
//         await refreshProducts();

//     } catch (error) {
//         console.error("Erreur lors de la modification du produit :", error);
//         alert("Une erreur est survenue lors de la modification du produit.");
//     }
// }