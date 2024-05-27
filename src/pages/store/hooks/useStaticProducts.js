import { useState, useEffect } from "react";
// import { ProductsCache } from "@/services/CacheService";
import { ProductsCache } from "../../../services/CacheService";
function useStaticProducts() {
  const url = `https://raw.githubusercontent.com/DibrySoft/static/master/discover.json`;
  let [products, setProducts] = useState();

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(async (data) => {
        const sectionsPromises = data.map(async (section) => {
          const productPromises = section.items.map((appId) => ProductsCache.getById(appId));
          const items = await Promise.all(productPromises);
          return { name: section.name, items: items };
        });
  
        const sections = await Promise.all(sectionsPromises);
        console.log('sec', sections);
        setProducts(sections);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
  }, []);

  return products;
}

export default useStaticProducts;
