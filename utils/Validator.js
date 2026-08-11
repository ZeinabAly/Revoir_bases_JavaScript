// Validator functions for product data

// RECUPERER LA BALISE D'ERREUR DE FACON GENERIQUE
export function displayErrorMessage(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

export const validateProduct = (product) => {
    const { name, price, category_id, description, image, stock } = product;
    let isValid = true;

    if (!name) {
        displayErrorMessage("name", "Veuillez remplir le nom du produit");
        isValid = false;
    }
    if (!category_id) {
        displayErrorMessage("category_id", "Veuillez choisir la catégorie du produit");
        isValid = false;
    }
    if (!price || typeof price !== "number" || price <= 0) {
        displayErrorMessage("price", "Veuillez saisir un nombre valide");
        isValid = false;
    }
    if (stock && (typeof stock !== "number" || stock < 0)) {
        displayErrorMessage("stock", "Veuillez saisir un nombre valide");
        isValid = false;
    }
    if (image && image instanceof Blob && !image.type.startsWith("image/")) {
        displayErrorMessage("image", "Type invalide : veuillez choisir un fichier image");
        isValid = false;
    }
    if (description && typeof description !== "string") {
        displayErrorMessage("description", "La description doit être une chaîne de caractères");
        isValid = false;
    }

    if (!isValid) {
        throw new Error("Formulaire invalide, Veuillez corriger les champs en rouge");
    }

    return true;
};