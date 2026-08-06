let database = null;

export function databaseConnection() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("boutique", 1);

        request.onupgradeneeded = (e) =>{
            database = e.target.result;

            let productsStore;
            if(!database.objectStoreNames.contains("products")) {
                productsStore = database.createObjectStore("products", {
                    keyPath: "id",
                    autoIncrement: true
                })
            }else{
                productsStore = e.target.transaction.objectStore("products");
            }

            // AJOUTER UN INDEX SUR LA COLONNE deleted_at
            if(!productsStore.indexNames.contains("by_deleted_at")){
                productsStore.createIndex("by_deleted_at", "deleted_at");
            }

            if(!database.objectStoreNames.contains("categories")) {
                database.createObjectStore("categories", {
                    keyPath: "id",
                    autoIncrement: true
                })
            }
        }

        request.onsuccess = (e) => {
            database = e.target.result;
            resolve(database);
        }
        request.onerror = () => {
            reject(request.error);
        }
    })
}
