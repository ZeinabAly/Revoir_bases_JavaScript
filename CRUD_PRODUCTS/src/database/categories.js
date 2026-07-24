import {databaseConnection} from "./db.js";

const getDB = async () => {
    return await databaseConnection();
}

export const addCategory = async (category) => {
    const db = await getDB();
    const request = db.transaction("categories", "readwrite")
                       .objectStore("categories")
                       .add(category);

    request.onsuccess = () => {
        console.log("Catégorie ajoutée", request.result);
    };
    request.onerror = () => {
        console.error("Erreur ajout catégorie", request.error);
    };
};



// DONNEES DE TEST POUR LES CATEGORIES
export const getAllCategories = async () => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const request = db.transaction("categories", "readonly")
                           .objectStore("categories")
                           .getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
    });
};


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

export async function getCategoryById(categoryId) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const request = db.transaction("categories", "readonly")
                           .objectStore("categories")
                           .get(categoryId);

        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
    });
}


// const tabCats = ["Électronique", "Maison", "Mode", "Sport", "Beauté", "Alimentation"];

// (async () => {
//     for (let i = 1; i < tabCats.length; i++) {
//         await addCategory({ name: tabCats[i] });
//     }
// })();