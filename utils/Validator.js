// Validator functions for product data

export const validateProduct = (product) => {
    const { name, price, category_id, description, image, stock } = product;
    if (!name || !price || !category_id) {
        throw new Error("Missing required fields");
    }
    if (typeof price !== "number" || price <= 0) {
        throw new Error("Invalid price");
    }  
    if (stock && (typeof stock !== "number" || stock < 0)) {
        throw new Error("Invalid stock");
    }

    // vérifier que c'est bien un type image/*
    if (image && image instanceof Blob && !image.type.startsWith("image/")) {
        throw new Error("Invalid image type: expected an image file");
    }

    if (description && typeof description !== "string") {
        throw new Error("Invalid description");
    }

    return true;
};