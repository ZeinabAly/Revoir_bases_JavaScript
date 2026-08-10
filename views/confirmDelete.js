export function confirmDeleteContent(product) {
   return `
      <div class="p-6 space-y-4">
         <h2 class="text-lg font-semibold text-slate-900">Supprimer le produit</h2>
         <p class="text-sm text-slate-600">
            Es-tu sûre de vouloir supprimer <strong>${product.name}</strong> ? Il n'apparaîtra plus dans la liste.
         </p>
         <div class="flex justify-end gap-2">
            <button type="button" class="modalClose rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
               Annuler
            </button>
            <button type="button" id="confirmDeleteBtn" data-product-id="${product.id}" class="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600">
               Supprimer
            </button>
         </div>
      </div>
   `;
}