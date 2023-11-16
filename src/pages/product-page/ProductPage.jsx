import React, { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import useProduct from "./hooks/useProduct";
import AspectRatio from "../../components/aspect-ratio/AspectRatio";
import "./ProductPage.scss";
import Shelf from "../../components/shelf/Shelf";
import useReviews from "./hooks/useReviews";
import Review from "./components/Review";
import useSummary from "./hooks/useSummary";
import ReviewCounter from "./components/ReviewCounter";
import usePlayerBought from "./hooks/usePlayerBought";
import { PurchaseApi } from "../../services/api/PurchaseApi";
import { PurchaseModel } from "../../services/model/PurchaseModel";
import { useState } from "react";
import ImagePopup from "./components/ImagePopup";
import Rating from "../../components/rating/Rating";
import { ReviewApi } from "../../services/api/ReviewApi";
import { UserContext } from "../../contexts/UserContextProvider";

const MAX_REVIEWS = 3;
const purchaseApi = new PurchaseApi();
const reviewApi = new ReviewApi();
let userBought = null;

function handlePurchase(productId, price) {
  let purchaseModel = new PurchaseModel();
  purchaseModel.productId = productId;
  purchaseModel.userId = 11;
  purchaseModel._date = new Date().toISOString();
  purchaseModel.value = price;

  purchaseApi.purchasePost(
    { body: JSON.stringify(purchaseModel) },
    (error, data) => {
      if (error === null) {
        console.log("kupilem se");
        //userBought = true;//ni umiem odswiezyc :D/ usePlayerBought('d', productId);
      }
    }
  );
}

function ProductPage() {
  const { id: productId } = useParams();
  const { currentUser } = useContext(UserContext);

  let product = useProduct(productId);
  let reviews = useReviews(productId);
  let summary = useSummary(productId);
  userBought = usePlayerBought("d", productId);

  const reviewTextRef = useRef();
  const [reviewRate, setReviewRate] = useState();

  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleImageClick = (event) => {
    setEnlargedImage(event.target.currentSrc);
  };

  const handleClosePopup = () => {
    setEnlargedImage(null);
  };

  const addReview = () => {
    reviewApi.reviewPost(
      {
        body: JSON.stringify({
          content: reviewTextRef.current?.value,
          rate: reviewRate,
          date: new Date().toISOString(),
          productId: productId,
          userId: currentUser.id,
        }),
      },
      () => {
        console.log("retr");
      }
    );
  };

  return (
    <article>
      <AspectRatio aspectRatio={12 / 5}>
        <div
          className="product-hero"
          style={{
            background: `linear-gradient(
            0deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 100%
          ),
          url("${product?.images?.Background}")`,
          }}
        >
          <div className="product-header">
            <h1 className="title">{product?.product.name}</h1>
            <span className="developer">{product?.product.developer.name}</span>
            <button
              className="buy-button accent large"
              onClick={() => {
                if (userBought);
                else handlePurchase(productId, product?.product.price);
              }}
            >
              {userBought ? "Install" : "Buy"}
            </button>
            <span className="price">{product?.product.price}₽</span>
          </div>
        </div>
      </AspectRatio>
      <section className="description">
        <img src={product?.images?.Icon} alt="Application Icon" />
        <h2>About</h2>
        <span>{product?.product.description}</span>
      </section>
      <section>
        <Shelf className="screenshots" title="Screenshots">
          {product?.images?.Images.map((child, index) => {
            return (
              <img
                src={child}
                alt="Screenshot"
                className="screenshot"
                key={index}
                onClick={handleImageClick}
              />
            );
          })}
        </Shelf>
        {enlargedImage && (
          <ImagePopup image={enlargedImage} onClose={handleClosePopup} />
        )}
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
          <button
            className="accent"
            onClick={() => {
              document.getElementById("add-review-dialog").showModal();
            }}
          >
            Add review
          </button>
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

      {/*Dialogs*/}
      <dialog id="add-review-dialog">
        <form>
          <div className="header">
            <h1>Add review</h1>
            <button className="capsule" formMethod="dialog">
              <i className="las la-times" />
            </button>
          </div>
          <div className="rating-box">
            <span>Rating</span>
            <Rating
              onValueChanged={(rating) => {
                setReviewRate(rating);
              }}
            />
          </div>
          <div className="details-box">
            <span>Review (optional)</span>
            <textarea ref={reviewTextRef} />
          </div>
          <div className="submit-area">
            <button
              className="accent outlined"
              formMethod="dialog"
              onClick={addReview}
            >
              Add review
            </button>
            <button formMethod="dialog">Cancel</button>
          </div>
        </form>
      </dialog>
    </article>
  );
}

export default ProductPage;
