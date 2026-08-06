
import Category from "../models/Category.js";

const tabCats = ["Électronique", "Maison", "Mode", "Sport", "Beauté", "Alimentation"];
export const createCategories = async () => {
    for (let i in tabCats) {
        await Category.create({ name: tabCats[i] });
    }
};