import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "./hooks/useProduct";
import AspectRatio from "../../components/aspect-ratio/AspectRatio";

import "./ProductPage.scss";
import Shelf from "../../components/shelf/Shelf";
import useReviews from "./hooks/useReviews";
import Review from "./components/Review";
import useSummary from "./hooks/useSummary";
import ReviewCounter from "./components/ReviewCounter";

const MAX_REVIEWS = 3;

function ProductPage() {
  const { id: productId } = useParams();
  let product = useProduct(productId);
  let reviews = useReviews(productId);
  let summary = useSummary(productId);

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
        <img src="/test/product_icon.png" alt="Application Icon" />
        <h2>About</h2>
        <span>{product?.description}</span>
      </section>
      <section>
        <Shelf className="screenshots" title="Screenshots">
          {Array.from({ length: 10 }).map((item, index) => {
            return (
              <img
                src="/test/product_cover.png"
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
          <div className="overall">
            <span>{summary?.avg.toFixed(1)}</span>
            <span>({reviews?.length})</span>
          </div>
          <div className="details">
            <ReviewCounter
              rate={5}
              count={summary?.rateCounts[0]}
              totalCount={reviews?.length}
            />
            <ReviewCounter
              rate={4}
              count={summary?.rateCounts[1]}
              totalCount={reviews?.length}
            />
            <ReviewCounter
              rate={3}
              count={summary?.rateCounts[2]}
              totalCount={reviews?.length}
            />
            <ReviewCounter
              rate={2}
              count={summary?.rateCounts[3]}
              totalCount={reviews?.length}
            />
            <ReviewCounter
              rate={1}
              count={summary?.rateCounts[4]}
              totalCount={reviews?.length}
            />
          </div>
          <button className="accent">Add review</button>
        </div>
        <div className="reviews-comments">
          {reviews?.slice(0, MAX_REVIEWS).map((review, index) => (
            <Review review={review} key={index} />
          ))}
          <button>Show all reviews</button>
        </div>
      </section>
      <section className="details">
        <h2>Details</h2>
      </section>
    </article>
  );
}

export default ProductPage;
