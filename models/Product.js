import { databaseConnection } from "../config/database.js";
import handleRequest from "../utils/handleRequest.js";
import { validateProduct } from "../utils/Validator.js";

export default class Product{
    constructor(name, price, category_id, description, image, stock, created_at, updated_at, deleted_at) {
        this.name = name;
        this.price = price;
        this.category_id = category_id;
        this.description = description;
        this.image = image;
        this.stock = stock;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    static getDB = async() => {
        return await databaseConnection();
    }

    static async getAll() {
        const db = await this.getDB();
        const index = db.transaction("products", "readonly").objectStore("products").index("by_deleted_at");
        const request = index.getAll(IDBKeyRange.only(null));
        return handleRequest(request, {
            successMessage: "Tous les produits récupérés :",
            errorMessage: "Erreur lors de la récupération de tous les produits :",
            type: "getAll"
        });
    }

    static async create(product) { 
        validateProduct(product);

        const productData = {
            ...product,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null,
        };

        const db = await this.getDB();
        const request = db.transaction("products", "readwrite").objectStore("products").add(productData);
        return handleRequest(request, {
            successMessage: "Produit créé avec succès :",
            errorMessage: "Erreur lors de la création du produit :",
            type: "create"
        });
    }

    // async read(id) {
    //     const db = await this.getDB();
    //     const request = db.transaction("products", "readonly").objectStore("products");
    //     return request.get(id);
    // }


    // async update(product) {
    //     const db = await this.getDB();
    //     const request = db.transaction("products", "readwrite").objectStore("products");
    //     return request.put(product);
    // }

    // async delete(id) {
    //     const db = await this.getDB();
    //     const request = db.transaction("products", "readwrite").objectStore("products");
    //     return request.delete(id);
    // }
}