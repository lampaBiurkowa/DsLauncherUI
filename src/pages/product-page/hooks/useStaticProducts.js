import { useState, useEffect } from "react";
import { ProductApi } from "@/services/api/ProductApi";
import getFilesData from "../../../services/getFilesData";

const productApi = new ProductApi();

function useStaticProducts() {
  const url = `https://raw.githubusercontent.com/DibrySoft/static/master/discover.json`;
  let [products, setProducts] = useState();

  useEffect(() => {
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      var sections = [];
      for (let i = 0; i < data.length; i++)
      {
        var appIds = data[i].items;
        productApi.productGetSubsetGet({ids: appIds}, (productError, productData) => {
          if (productError === null) {
            productApi.productRatesSubsetGet({ids: appIds}, async (ratesError, ratesData) => {
              if (ratesError === null) {
                let result = [];
                for (let j = 0; j < appIds.length; j++)
                {
                  let icon = null;
                  try
                  {
                    icon = (await getFilesData(productData[j].name)).Icon;
                  }
                  catch {}
                  result.push({product: productData[j], summary: ratesData[j], icon: icon});
                }
                sections.push({name: data[i].name, items: result});
                if (i == data.length - 1) //HZD
                  setProducts(sections);
              }
            });
          }
        });
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }, []);

  return products;
}

export default useStaticProducts;
