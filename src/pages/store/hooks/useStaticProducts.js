import { useState, useEffect } from "react";
import { ProductsCache } from "@/services/CacheService";

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
      .then((data) => {
        var sections = [];
        for (let i = 0; i < data.length; i++) {
          const result = [];
          var appIds = data[i].items;
          for (let j = 0; j < appIds.length; j++) {
            var product = ProductsCache.getById(appIds[j]);
            result.push(product);
          }
          sections.push({ name: data[i].name, items: result });
        }
        setProducts(sections);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  return products;
}

export default useStaticProducts;
