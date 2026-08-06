import { databaseConnection } from "../config/database.js";
import handleRequest from "../utils/handleRequest.js";

export default class Category{
    constructor(id, name, created_at, updated_at, deleted_at){
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    static getDB = async () => {
        return await databaseConnection();
    }

    static async getAllCategories(){
        const db = await this.getDB();
        const request = db.transaction("categories", "readonly").objectStore("categories").getAll();
        return handleRequest(request, {
            successMessage: "Toutes les catégories ont été recupérées",
            errorMessage: "Erreur lors de la recupération des catégories",
            type: "getAll",
        });
    }

    static async getCategoryById(id){
        const db = await this.getDB();
        
        const request = db.transaction("categories", "readonly").objectStore("categories").get(id);
        return handleRequest(request, {
            successMessage: "Category recupérée",
            errorMessage: "Erreur lors de la recupération de la catégorie",
            type: "getById",
        });
    }
    
    static async create(category){
        const db = await this.getDB();
        const categoryData = {
            ...category,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null,
        }
        const request = db.transaction("categories", "readwrite").objectStore("categories").add(categoryData);
        return handleRequest(request, {
            successMessage: "Categorie ajouté avec succès",
            errorMessage: "Erreur lors de l'ajout",
            type: "create"
        })
    }
}