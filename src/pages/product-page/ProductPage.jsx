import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "./hooks/useProduct";
import AspectRatio from "../../components/aspect-ratio/AspectRatio";

import "./ProductPage.scss";

function ProductPage() {
  const { id: productId } = useParams();
  let product = useProduct(productId);
  console.log(product);

  return (
    <article>
      <AspectRatio aspectRatio={12 / 5}>
        <div className="product-hero">
          <div className="product-header">
            <h1 className="title">{product?.name}</h1>
            <span className="developer">{product?.author.name}</span>
            <button className="buy-button">Buy</button>
            <span className="price">{product?.price}₽</span>
          </div>
        </div>
      </AspectRatio>
    </article>
  );
}

export default ProductPage;
