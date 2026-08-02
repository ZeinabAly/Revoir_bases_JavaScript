export function addProductModalContent(){
    return `
    
        <div class="">
            <div id="notifContent"></div>
            <div class="mb-5 flex items-center justify-between">
            <h2 class="font-display text-lg font-semibold text-slate-900">Ajouter un produit</h2>
            <button class="modal-close modalClose" aria-label="Fermer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            </div>

            <form class="space-y-4" id="add_product_form" method="post" enctype="multipart/form-data">
            <div>
                <label class="label" for="product-name">Nom du produit</label>
                <input id="product-name" name="name" type="text" class="input" placeholder="ex: Casque sans fil Aria">
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
                <input id="product-price" name="price" type="number" min="0" step="0.01" class="input" placeholder="0.00">
                </div>
            </div>

            <div class="grid grid-cols-1 gap-3">
                <!-- <div>
                <label class="label" for="product-stock">Stock</label>
                <input id="product-stock" type="number" min="0" class="input" placeholder="0">
                </div> -->
                <div>
                <label class="label" for="product-image">Image du produit</label>
                <input id="product-image" name="image" type="file" maxlength="2" class="input">
                </div>
            </div>

            <div>
                <label class="label" for="product-description">Description</label>
                <textarea id="product-description" name="description" rows="3" class="input resize-none"></textarea>
            </div>

            <div class="flex justify-end gap-2 pt-2">
                <button type="button" class="modalClose" aria-label="Fermer" class="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200">Annuler</button>
                <button type="submit" class="btn-primary">Enregistrer</button>
            </div>
            </form>
        </div>
    `;
}
