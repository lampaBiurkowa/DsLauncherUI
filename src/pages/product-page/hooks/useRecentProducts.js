import { useState, useEffect } from "react";
import { ProductApi } from "@/services/api/ProductApi";

const productApi = new ProductApi();
const url = 'https://raw.githubusercontent.com/DibrySoft/static/master/recent.json';

function useRecentProducts() {
  
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
      var recentAppIds = data;//JSON.parse(data);
      productApi.productGetSubsetGet({ids: recentAppIds}, (error, data) => {
        if (error === null) {
          console.log(data);
          setProducts(data);
        }
      });
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }, []);

  return products;
}

export default useRecentProducts;
