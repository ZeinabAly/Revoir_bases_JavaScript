import Product from "../models/Product.js";
import { displayProducts } from "../views/products.js";
import {showNotification} from "../utils/Notification.js";

export default class ProductController{
    
    constructor(products){
        this.products = products ?? [];
    }

    static getAll = async () => {
        const {data: products} = await Product.getAll();
        return displayProducts(products);
    }


    // FONCTION POUR CREER UN NOUVEAU PRODUIT
    static create = async (data) => {
        try {
            const product = new Product(data.name, data.price, data.category_id, data.description, data.image);
           
            const result = await Product.create(product);
            showNotification(result.message, "success");
            await this.getAll(); // recharger la liste via le controller
            return { success: true };
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
            showNotification(error.message, "error");
            return { success: false };
        }
    };
}
