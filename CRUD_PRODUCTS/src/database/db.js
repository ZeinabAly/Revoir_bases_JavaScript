let database;

export function databaseConnection() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("boutique", 1);

        request.onupgradeneeded = (e) =>{
            database = e.target.result;

            if(!database.objectStoreNames.contains("products")) {
                database.createObjectStore("products", {
                    keyPath: "id",
                    autoIncrement: true
                })
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