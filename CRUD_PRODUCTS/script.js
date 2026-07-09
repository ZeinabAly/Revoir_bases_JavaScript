//Créer(ouvrir) la base de données avec la version 1
const request = indexedDB.open("boutique", 1);
let db;

//Créer la structure
request.onupgradeneeded = (e) => {
   db = e.target.result;

   db.createObjectStore("products", {
      keyPath: "id" 
   })
}

// CREATE PRODUCT
function addProduct(product) {
   // La transaction permet de créer un contexte temporaire de travail
   const transaction = db.transaction("products", "readwrite");
   // ObjectStore : acceder à la zone de stockage de la table, ainsi on peut add, get, delete, put des données
   const store = transaction.objectStore("products");
   // Indiquer l'action à effectuer sur la table, ici on ajoute un produit
   const request = store.add(product);
   request.onsuccess = () => {
      console.log("Produit ajouté :", product);
   }
}


function getProduct(id){
   const transaction = db.transaction("products", "readonly");
   const store = transaction.objectStore("products");
   const request = store.get(id);
   request.onsuccess = () => {
      console.log("Produit récupéré :", request.result);
   }
}

function updateProduct(product){
   const transaction = db.transaction("products", "readwrite");
   const store = transaction.objectStore("products");
   const request = store.put(product);
   request.onsuccess = () => {
      console.log("Produit mis à jour :", product);
   }
}

function deleteProduct(id){
   const transaction = db.transaction("products", "readwrite");
   const store = transaction.objectStore("products");
   const request = store.delete(id);   
   request.onsuccess = () => {
      console.log("Produit supprimé :", id);
   }  
}
function getAllProducts(){
   const transaction = db.transaction("products", "readonly");
   const store = transaction.objectStore("products");
   const request = store.getAll();
   request.onsuccess = () => {
      console.log("Tous les produits :", request.result);
   }
}


request.onsuccess = (e) => {
  db = e.target.result;
  console.log("Base ouverte :", db);

  // LANCER LES TESTS QUAND LA BASE EST OUVERTE CAR ELLE EST ASYNCHRONE 
  // TESTS
  addProduct({
      id:1,
      name:"Clavier",
      price:50
  });
  addProduct({
      id:2,
      name:"Souris",   
     price:25
  });   
  addProduct({
      id:3,
      name:"Écran",
        price:150
  });
  
  
  updateProduct({
      id:1,
      name:"Clavier Mécanique",
      price:75
  });
  deleteProduct(1);
  getAllProducts();

}

