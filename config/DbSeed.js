import { databaseConnection } from "./database.js";
import { createCategories } from "../Factory/CategoryFactory.js";
import { createProducts } from "../Factory/ProductFactory.js";

export default class DBSeed{
    static getDB = async () => {
        return await databaseConnection();
    }

    static getCount = async (nomTable) => {
        const db = await this.getDB();
        return new Promise((resolve, reject) =>{
            const request = db.transaction(nomTable, "readonly").objectStore(nomTable).getAll();

            request.onsuccess = () => {
                resolve(request.result.length);
            }
            request.onerror = () => {
                reject(request.error);
            }
        })
    }

    static async applyFactory(nomTable, factoryFn){
        const count = await this.getCount(nomTable);
        if(count == 0) await factoryFn();
        
    }
}
