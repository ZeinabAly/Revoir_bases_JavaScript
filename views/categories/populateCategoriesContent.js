// CHARGER LES CATEGORIES DANS LES CHAMPS SELECT
export function populateCategoriesSelect(categories, selectedCat = null){
   return categories.forEach((category) => {
      let option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      const modal_categories = document.querySelector(".modal_categories");
      modal_categories.appendChild(option);
      if(selectedCat && category.id === selectedCat){
        option.selected = true
      }
   });
}

export function populateCategoriesFilter(categories){
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
}