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
          if (productError !== null)
            return;
          var ids = [];
          for (let j = 0; j < productData.length; j++)
            ids.push(productData[j].id);

          productApi.productRatesSubsetGet({ids: ids}, async (ratesError, ratesData) => {
            if (ratesError !== null)
              return;

            let result = [];
            for (let j = 0; j < ratesData.length; j++)
            {
              let icon = (await getFilesData(productData[j].name)).Icon;
              result.push({product: productData[j], summary: ratesData[j], icon: icon});
            }
            sections.push({name: data[i].name, items: result});
            if (sections.length == data.length)
              setProducts(sections);
          });
          
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
