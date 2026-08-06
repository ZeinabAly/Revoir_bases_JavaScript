import Product from "../models/Product.js";

const tabProducts = [
    // Électronique - id: 1
    { name: "Casque audio", price: 20, description: "Casque sans fil, bonne autonomie", stock: 30, category_id: 1 },
    { name: "Ordinateur Portable", price: 200, description: "PC 10e génération Core i7 32Gb de RAM", stock: 10, category_id: 1 },
    { name: "Chargeur USB-C", price: 15, description: "Charge rapide 65W", stock: 50, category_id: 1 },

    // Maison - id: 2
    { name: "Canapé 3 places", price: 450, description: "Confort et style", stock: 5, category_id: 2 },
    { name: "Lampe de bureau", price: 22, description: "Éclairage LED réglable", stock: 25, category_id: 2 },
    { name: "Set de couverts", price: 18, description: "Inox, 24 pièces", stock: 40, category_id: 2 },

    // Mode - id: 3
    { name: "T-shirt coton bio", price: 25, description: "Basique intemporel", stock: 100, category_id: 3 },
    { name: "Chaussure de sport", price: 14, description: "Running léger", stock: 35, category_id: 3 },
    { name: "Casquette", price: 12, description: "Réglable, coton", stock: 60, category_id: 3 },

    // Sport - id: 4
    { name: "Ballon de foot", price: 30, description: "Taille officielle", stock: 40, category_id: 4 },
    { name: "Tapis de yoga", price: 19, description: "Antidérapant, 6mm", stock: 45, category_id: 4 },
    { name: "Haltères 2kg (paire)", price: 22, description: "Revêtement néoprène", stock: 20, category_id: 4 },

    // Beauté - id: 5
    { name: "Parfum", price: 50, description: "Parfums Dior", stock: 15, category_id: 5 },
    { name: "Vaseline", price: 11, description: "Vaseline, Huile de corps", stock: 55, category_id: 5 },
    { name: "Crème hydratante", price: 18, description: "Pour tous types de peau", stock: 60, category_id: 5 },

    // Alimentation - id: 6
    { name: "Chips", price: 2, description: "Chips nature", stock: 80, category_id: 6 },
    { name: "Cookie", price: 3, description: "Petit goûter pour les enfants", stock: 70, category_id: 6 },
    { name: "Bissap", price: 4, description: "Jus africain 100% naturel", stock: 65, category_id: 6 },
];

export const createProducts = async () => {
    for (const product of tabProducts) {
        await Product.create({ ...product, image: null });
    }
};