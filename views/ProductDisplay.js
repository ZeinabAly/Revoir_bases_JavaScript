import Category from "../models/Category.js";


export async function productDisplay(product) {
    const imageUrl = product.image ? URL.createObjectURL(product.image) : null;
    const {data: category} = await Category.getCategoryById(parseInt(product.category_id));
    
    return `<article class="card" data-product-id="${product.id}">
        <div class="flex items-center justify-center bg-slate-100 text-5xl">
        ${imageUrl ? `<img src="${imageUrl}" alt="${product.name}" class="h-[250px] w-full object-cover">` : '🎧'}
        </div>
        <div class="flex flex-1 flex-col gap-2 p-4">
        <div class="flex items-start justify-between gap-2">
            <h3 class="font-display text-sm font-semibold text-slate-800">${product.name}</h3>
            <span class="badge-stock">${product.stock ?? 1} en stock</span>  
        </div>
        <p class="text-xs text-slate-500">${category ? category.name : 'Catégorie inconnue'}</p>
        <p class="line-clamp-2 text-xs text-slate-500">${product.description || 'Pas de description'}</p>
        <div class="mt-auto flex items-center justify-between pt-2">
            <span class="font-mono text-base font-semibold text-amber-400">${product.price} €</span>
            <div class="flex gap-1">
            
                <button class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 modifier" aria-label="Modifier" data-action="edit" data-product-id="${product.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-500 supprimer" aria-label="Supprimer" data-action="delete" data-product-id="${product.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"/></svg>
                </button>
                <button class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-sky-500" aria-label="Voir" data-action="view" data-product-id="${product.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </button>
            </div>
        </div>
        </div>
    </article>`;
} 