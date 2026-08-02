import Product from "../models/Product.js";
import { displayProducts } from "../views/products.js";

export default class ProductController{
    
    constructor(products){
        this.products = products ?? [];
    }

    static getAll = async () => {
        const {data: products} = await Product.getAll();
        return displayProducts(products);
    }

    static create = async (product) => {
        const {data: newProduct} = await Product.create(product);
        return newProduct;
    }
}