import { useState, useEffect } from "react";
import { ProductApi } from "@/services/api/ProductApi";
import getFilesData from "../../../services/getFilesData";

const productApi = new ProductApi();

function useStaticProducts(staticResourceName) {
  const url = `https://raw.githubusercontent.com/DibrySoft/static/master/${staticResourceName}.json`;
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
      var appIds = data;
      productApi.productGetSubsetGet({ids: appIds}, (error, data) => {
        if (error === null) {
          productApi.productRatesSubsetGet({ids: appIds}, async (error2, data2) => {
            if (error2 === null) {
              let result = [];
              for (let i = 0; i < appIds.length; i++)
              {
                let icon = null;
                try
                {
                  icon = (await getFilesData(data[i].name)).Icon;
                }
                catch {}
                result.push({product: data[i], summary: data2[i], icon: icon});
              }

              setProducts(result);
            }
          });
        }
      });
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }, []);

  return products;
}

export default useStaticProducts;
