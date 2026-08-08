// Validator functions for product data

export const validateProduct = (product) => {
    const { name, price, category_id, description, image, stock } = product;
    if (!name || !price || !category_id) {
        throw new Error("Veuillez remplir les champs obligatoires");
    }
    if (typeof price !== "number" || price <= 0) {
        throw new Error("Veuillez saisir un nombre valide");
    }  
    if (stock && (typeof stock !== "number" || stock < 0)) {
        throw new Error("Veuillez saisir un nombre valide");
    }

    // vérifier que c'est bien un type image/*
    if (image && image instanceof Blob && !image.type.startsWith("image/")) {
        throw new Error("Type Invalide: veuillez choisir un fichier image");
    }

    if (description && typeof description !== "string") {
        throw new Error("La description doit être une chaine de caractères");
    }

    return true;
};