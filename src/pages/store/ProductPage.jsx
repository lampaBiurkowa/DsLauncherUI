import React, { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import useProduct from "./hooks/useProduct";
import AspectRatio from "@/components/aspect-ratio/AspectRatio";
import "./ProductPage.scss";
import Shelf from "@/components/shelf/Shelf";
import useReviews from "./hooks/useReviews";
import Review from "./components/Review";
import useSummary from "./hooks/useSummary";
import ReviewCounter from "./components/ReviewCounter";
import usePlayerBought from "./hooks/usePlayerBought";
import { useState } from "react";
import ImagePopup from "./components/ImagePopup";
import Rating from "@/components/rating/Rating";
import { UserContext } from "@/contexts/UserContextProvider";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { DevelopersCache } from "@/services/CacheService";

const MAX_REVIEWS = 3;
// const purchaseApi = new PurchaseApi();
// const reviewApi = new ReviewApi();
const launcherApi = new DsLauncherApiClient();
let userBought = null;

function handlePurchase(productId, price) {
  let purchaseModel = new PurchaseModel();
  purchaseModel.productId = productId;
  //purchaseModel.userGuid = 11; TODO OHARNAC TO
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
          userId: currentUser.guid,
        }),
      },
      () => {
        console.log("retr");
      }
    );
  };

  console.log("abra", product);

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
          url("${product?.static?.Background}")`,
          }}
        >
          <div className="product-header">
            <h1 className="title">{product?.data.name}</h1>
            <span className="developer">
              {DevelopersCache.getById(product?.data.developerGuid)?.name}
            </span>
            <button
              className="buy-button accent large"
              onClick={() => {
                if (userBought);
                else handlePurchase(productId, product?.data.price);
              }}
            >
              {userBought ? "Install" : "Buy"}
            </button>
            <span className="price">{product?.data.price}₽</span>
          </div>
        </div>
      </AspectRatio>
      <section className="description">
        <img src={product?.static?.Icon} alt="Application Icon" />
        <h2>About</h2>
        <span>{product?.data.description}</span>
      </section>
      <section className="screenshots">
        <Shelf title="Screenshots">
          {product?.static?.Images.map((child, index) => {
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
            {[5, 4, 3, 2, 1].map((rate, index) => (
              <ReviewCounter
                key={rate}
                rate={rate}
                count={summary?.rateCounts[index]}
                totalCount={reviews?.length}
              />
            ))}
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
          <button
            onClick={() => {
              document.getElementById("all-reviews-dialog").showModal();
            }}
          >
            Show all reviews
          </button>
        </div>
      </section>

      <section className="details">
        <h2>Details</h2>

        <div class="specs-box">
          <h3>System Requirements</h3>
          <ul>
            <li>
              <span className="spec-type">RAM:&nbsp;</span>
              {product?.static.RamMib}MB
            </li>
            <li>
              <span className="spec-type">Disk space:&nbsp;</span>
              {product?.static.DiskMib}MB
            </li>
            <li>
              <span className="spec-type">CPU:&nbsp;</span>
              {product?.static.CpuMHz}MHz
            </li>
          </ul>
        </div>

        <div className="additional-info-box">
          <h3>Additional information</h3>
        </div>
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
      <dialog id="all-reviews-dialog">
        <form>
          <div className="header">
            <h1>Reviews</h1>
            <button className="capsule" formMethod="dialog">
              <i className="las la-times" />
            </button>
          </div>
        </form>
      </dialog>
    </article>
  );
}

export default ProductPage;
