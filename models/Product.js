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
        const request = db.transaction("products", "readonly").objectStore("products").getAll();

        const result = await handleRequest(request, {
            successMessage: "Tous les produits récupérés :",
            errorMessage: "Erreur lors de la récupération de tous les produits :",
            type: "getAll"
        });

        result.data = result.data.filter((pd) =>  pd.deleted_at === null);
        return result;
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

    static async getById(id) {
        const db = await this.getDB();
        const request = db.transaction("products", "readonly").objectStore("products").get(id);
        return handleRequest(request, {
            successMessage: "Produit retrouvé",
            errorMessage: "Error : produit introuvable",
            type: "getById"
        })
    }


    // async update(product) {
    //     const db = await this.getDB();
    //     const request = db.transaction("products", "readwrite").objectStore("products");
    //     return request.put(product);
    // }

    static async delete(id) {
        const db = await this.getDB();
        // ON NE SUPPRIME PLUS, ON PASSE JUSTE DELETE_AT A LA DATA DE L'INSTANT
        const product = await this.getById(id);
        if (!product) {
            throw new Error("Produit introuvable");
        }
        product.deleted_at = new Date().toISOString();
        const request = db.transaction("products", "readwrite").objectStore("products").put(product);

        return handleRequest(request, {
            successMessage: "Produit supprimé",
            errorMessage: "Error lors la suppression",
            type: "delete"
        })
    }
}