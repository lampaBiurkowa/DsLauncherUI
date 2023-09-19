import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "./hooks/useProduct";
import AspectRatio from "../../components/aspect-ratio/AspectRatio";

import "./ProductPage.scss";
import Shelf from "../../components/shelf/Shelf";
import useReviews from "./hooks/useReviews";
import Review from "./components/Review";

function ProductPage() {
  const { id: productId } = useParams();
  let product = useProduct(productId);
  let reviews = useReviews(productId);

  let summary = {
    average: 4.56,
    reviewsTotal: 34,
    reviews5: 4,
    reviews4: 4,
    reviews3: 4,
    reviews2: 4,
    reviews1: 4,
  };

  return (
    <article>
      <AspectRatio aspectRatio={12 / 5}>
        <div className="product-hero">
          <div className="product-header">
            <h1 className="title">{product?.name}</h1>
            <span className="developer">{product?.developer.name}</span>
            <button className="buy-button accent large">Buy</button>
            <span className="price">{product?.price}₽</span>
          </div>
        </div>
      </AspectRatio>
      <section className="description">
        <img src="/public/test/product_icon.png" alt="Application Icon" />
        <h2>About</h2>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ex
          assumenda autem. Officia temporibus atque debitis, voluptatem sequi
          modi quisquam. Molestiae saepe officiis cupiditate fugit quaerat
          magnam ut earum similique. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Eveniet inventore optio facere nobis, adipisci
          blanditiis sint. Sunt nostrum atque vero optio dolorum, ipsam libero
          suscipit harum velit sed aliquid tempore!
        </span>
      </section>
      <section>
        <Shelf className="screenshots" title="Screenshots">
          {Array.from({ length: 10 }).map((item, index) => {
            return (
              <img
                src="/public/test/product_cover.png"
                alt="Screenshot"
                className="screenshot"
                key={index}
              />
            );
          })}
        </Shelf>
      </section>
      <section className="reviews">
        <h2>Comments & Reviews</h2>
        <div className="reviews-summary">
          <div>
            <span>{5}</span>
            <span>({1})</span>
          </div>
        </div>
        <div className="reviews-comments">
          {reviews?.map((review, index) => (
            <Review review={review} key={index} />
          ))}
        </div>
      </section>
      <section className="details">
        <h2>Details</h2>
      </section>
    </article>
  );
}

export default ProductPage;
