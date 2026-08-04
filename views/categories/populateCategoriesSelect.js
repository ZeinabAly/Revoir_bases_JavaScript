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