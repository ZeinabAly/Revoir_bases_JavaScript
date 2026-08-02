import { databaseConnection } from "../config/database.js";
import handleRequest from "../utils/handleRequest.js";
import { validateProduct } from "../utils/Validator.js";

export default class Product{
    constructor(id, name, price, category_id, description, image, stock, created_at, updated_at, deleted_at) {
        this.id = id;
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
        const request = db.transaction("products", "readonly").objectStore("products").getAll();
        return handleRequest(request, {
            successMessage: "Tous les produits récupérés :",
            errorMessage: "Erreur lors de la récupération de tous les produits :",
            type: "getAll"
        });
    }

    static async create(product) { 
        validateProduct(product);
        const db = await this.getDB();
        const request = db.transaction("products", "readwrite").objectStore("products").add(product);
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