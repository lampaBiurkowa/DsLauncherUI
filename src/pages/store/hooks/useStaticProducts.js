import { useState, useEffect } from "react";
import { ProductsCache } from "@/services/CacheService";
import { deafultBucket, publicPath } from "@/App";

function useStaticProducts() {
  const url = `${publicPath}/${deafultBucket}/discover.json`;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((section) => {
          const sectionProducts = { name: section.name, items: [] };
          setProducts((prevProducts) => [...prevProducts, sectionProducts]);

          section.items.forEach((appId) => {
            ProductsCache.getById(appId)
              .then((item) => {
                setProducts((prevProducts) => {
                  return prevProducts.map((prevSection) =>
                    prevSection.name === section.name
                      ? {
                          ...prevSection,
                          items: [...prevSection.items, item],
                        }
                      : prevSection
                  );
                });
              })
              .catch((error) => {
                console.error(
                  "There has been a problem with fetching product:",
                  error
                );
              });
          });
        });
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
