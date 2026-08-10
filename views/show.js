export function showProductDetails(product) {
   const imageUrl = product.image ? URL.createObjectURL(product.image) : null;

   return `
      <div class="p-6 space-y-4">
         <h2 class="text-lg font-semibold text-slate-900">${product.name}</h2>
         ${imageUrl ? `<img src="${imageUrl}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg" />` : ""}
         <p class="text-sm text-slate-600">${product.description ?? ""}</p>
         <div class="flex items-center justify-between text-sm">
            <span class="font-medium text-slate-900">${product.price} €</span>
            <span class="text-slate-500">Stock : ${product.stock ?? 0}</span>
         </div>
         <div class="flex justify-end">
            <button type="button" class="modalClose rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
               Fermer
            </button>
         </div>
      </div>
   `;
}