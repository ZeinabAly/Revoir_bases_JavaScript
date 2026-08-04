import { productDisplay } from "./ProductDisplay.js";

export async function displayProducts(products) {
   const productList = document.getElementById("productList");
   productList.innerHTML = ""; // Vider la liste avant d'ajouter les produits

   for (const product of products) {
      const productHTML = await productDisplay(product);
      productList.insertAdjacentHTML("afterbegin", productHTML);
   }
}

