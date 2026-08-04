import Category from "../models/Category.js";
import { populateCategoriesSelect } from "../views/categories/populateCategoriesSelect.js";

export default class CategoryController{
    
    constructor(categories){
        this.categories = categories ?? [];
    }

    static getAll = async () => {
        const {data: categories} = await Category.getAllCategories();
        return populateCategoriesSelect(categories);
    }
}