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
          <label class="label" for="product-name">Nom du produit <span class="error">*</span></label>
          <input id="product-name" name="name" type="text" class="input" value="${product.name || ''}">
          <p class="error" id="name-error"></p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label" for="product-category">Catégorie <span class="error">*</span></label>
            <select id="product-category" name="category" class="input modal_categories">
              <option value="">Sélectionner une catégorie</option>
            </select>
            <p class="error" id="category_id-error"></p>
          </div>
          <div>
            <label class="label" for="product-price">Prix (€) <span class="error">*</span></label>
            <input id="product-price" name="price" type="number" min="0" step="0.01" class="input" value="${product.price || ''}">
            <p class="error" id="price-error"></p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-3">
            <div>
                <label class="label" for="product-stock">Stock <span class="error">*</span></label>
                <input id="product-stock" name="stock" type="number" min="1" class="input" value="${product.stock || 1}">
                <p class="error" id="stock-error"></p>
            </div> 
            <div>
                <label class="label" for="product-image">Image du produit</label>
                <input id="product-image" name="image" type="file" maxlength="2" class="input">
                <p class="error" id="image-error"></p>
                ${product.image ? `<img src="${product.image}" alt="Image du produit" class="mt-2 w-32 h-32 object-cover rounded-md">` : ''}
              </div>
        </div>

        <div>
          <label class="label" for="product-description">Description</label>
          <textarea id="product-description" name="description" rows="3" class="input resize-none">${product.description || ''}</textarea>
          <p class="error" id="description-error"></p>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="modalClose inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200">Annuler</button>
          <button type="submit" class="btn-primary">Modifier</button>
        </div>
      </form>
    </div>
    `;
}

export function readEditForm(product, form){
  const formData = new FormData(form);

  const name = formData.get("name")?.trim() ?? "";
  const description = formData.get("description")?.trim() ?? "";
  const category_id = formData.get("category") ? Number(formData.get("category")) : null;
  const price = formData.get("price") ? Number(formData.get("price")) : null;
  const stock = formData.get("stock") ? Number(formData.get("stock")) : null;

  let imageFile = product.image;
  const newImage = formData.get("image");
  if (newImage && newImage.size > 0) {
      imageFile = newImage;
  }

  return {
    id: product.id,
    name: name,
    category_id: category_id,
    price: price,
    stock: stock,
    image: imageFile,
    description: description
  };
}
