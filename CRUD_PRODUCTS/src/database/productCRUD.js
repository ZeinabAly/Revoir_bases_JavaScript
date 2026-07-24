import {databaseConnection} from "./db.js";
import {productDisplay} from './productDisplay.js';

const getDB = async() => {
    return await databaseConnection();
}

// LES MESSAGES D'ERREUR ET SUCCESS 
const handleRequest = (request, {successMessage, errorMessage, type}) => {
    return new Promise((resolve, reject) =>{
        request.onsuccess = () => {
            console.log(successMessage);
            if(type === "delete" || type === "update") {
                resolve({
                    success: true,
                    message: successMessage,
                    data: true
                });
            }else{
                resolve({
                    success: true,
                    message: successMessage,
                    data: request.result
                });
            }
        }
        request.onerror = () => {
            console.error(errorMessage, request.error);
            reject(request.error);
        }
    })
}

// Fonction pour valider les requetes
// function ProductValidator(product) {
//     if (!product.id || !product.name || !product.price) {
//         throw new Error("Le produit doit avoir un id, un nom et un prix.");
//     }
// }


// CRUD PRODUCTS
export async function addProduct(product){
    const db = await getDB();
    // Créer une transaction pour accéder à la table "products" en mode lecture/écriture
    const transaction = db.transaction("products", "readwrite");

    // Accéder au stockage de la table "products"
    const store = transaction.objectStore("products");

    // Ajouter le produit à la table
    const request = store.add(product);

    return handleRequest(request, {
        successMessage: "Produit ajouté", 
        errorMessage: "Erreur lors de l'ajout du produit", 
        type: "add"
    });

}


//  RECUPERER UN PRODUIT
export async function getProduct(id){
    const db = await getDB();

    const request = db.transaction("products", "readonly").objectStore("products").get(id);

    return handleRequest(request, {
        successMessage: "Produit récupéré :",
        errorMessage: "Erreur lors de la récupération du produit :",
        type: "get"
    });

}

// RECUPERER TOUS LES PRODUITS
export async function getAllProducts(){
    const db = await getDB();
    const request = db.transaction("products", "readonly").objectStore("products").getAll();

    return handleRequest(request, {
        successMessage: "Tous les produits récupérés :",
        errorMessage: "Erreur lors de la récupération de tous les produits :",
        type: "getAll"
    });

}

// MODIFIER UN PRODUIT
export async function updateProduct(product){
    const db = await getDB();
    const request = db.transaction("products", "readwrite").objectStore("products").put(product);

    return handleRequest(request, {
        successMessage: "Produit modifié avec succès",
        errorMessage: "Erreur lors de la mise à jour du produit :",
        type: "update"
    });
}


// SUPPRIMER UN PRODUIT
export async function deleteProduct(id){
    const db = await getDB();
    const request = db.transaction("products", "readwrite").objectStore("products").delete(id);

    return handleRequest(request, {
        successMessage: "Produit supprimé :",
        errorMessage: "Erreur lors de la suppression du produit :",
        type: "delete"
    });
}

// GERER L'AFFICHAGE DES PRODUITS
export async function displayProducts(products) {
   const productList = document.getElementById("productList");
   productList.innerHTML = ""; // Vider la liste avant d'ajouter les produits

   for (const product of products) {
      const productHTML = await productDisplay(product);
      document.getElementById("productList").insertAdjacentHTML("afterbegin", productHTML);
   }
}