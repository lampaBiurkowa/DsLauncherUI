import { useParams } from "react-router-dom";
import useProduct from "./hooks/useProduct";
import AspectRatio from "@/components/aspect-ratio/AspectRatio";
import "./ProductPage.scss";
import Shelf from "@/components/shelf/Shelf";
import Dialog from "@/components/dialog/Dialog";
import Carousel from "@/components/carousel/Carousel";
import useReviews from "./hooks/useReviews";
import Review from "./components/Review";
import useSummary from "./hooks/useSummary";
import useDeveloperForProduct from "./hooks/useDeveloperForProduct";
import { useState, useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { DevelopersCache } from "@/services/CacheService";
import AddReviewForm from "./components/AddReviewForm";
import { executeCommand } from "@/services/DsLauncherService";

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
  const userId = useContext(UserContext)?.currentUser?.id;

  let product = useProduct(productId);
  let reviews = useReviews(productId);
  let summary = useSummary(productId);
  let developer = useDeveloperForProduct(productId);

  const [reviewDialogOpen, setReviewDialogOpen] = useState();
  const [galleryDialogOpen, setGalleryDialogOpen] = useState();
  console.log("wazne!", product, productId);
  return (
    <article>
      <AspectRatio aspectRatio={12 / 5}>
        <div
          className="product-hero"
          style={{
            "background-image": `linear-gradient(
            0deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 100%
          ),
          url("${product?.static?.Background}")`,
          }}
        >
          <div className="product-header">
            <h1 className="title">{product?.model?.name}</h1>
            <span className="developer">{developer?.model?.name}</span>
            <button
              className="buy-button accent large"
              onClick={() => {
                if (userBought);
                else handlePurchase(productId, product?.model?.price);
              }}
            >
              {userBought ? "Install" : "Buy"}
            </button>
            <span className="price">{product?.model?.price}₽</span>
          </div>
        </div>
      </AspectRatio>
      <section className="description">
        <img src={product?.static?.Icon} alt="Application Icon" />
        <h2>About</h2>
        <span>{product?.model?.description}</span>
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
                onClick={() => setGalleryDialogOpen(true)}
              />
            );
          })}
        </Shelf>
        <Dialog
          open={galleryDialogOpen}
          header="Screenshots"
          onClosed={() => setGalleryDialogOpen(false)}
        >
          <div className="screenshot-carousel-container">
            <Carousel auto={false}>
              {product?.static?.Images.map((child, index) => {
                return <img src={child} alt="Screenshot" key={index} />;
              })}
            </Carousel>
          </div>
        </Dialog>
      </section>

      <section className="reviews">
        <h2>Comments & Reviews</h2>
        <div className="reviews-summary">
          <div className="overall">
            <span>{summary?.avg}</span>
            <span>({reviews?.length})</span>
          </div>
          <div className="review-details">
            {[5, 4, 3, 2, 1].map((rate, index) => (
              <div className="rate-counter">
                <span className="rate">{rate}</span>
                <span className="count">({summary?.rateCounts[index]})</span>
                <div className="bar">
                  <div
                    className="fill bar"
                    style={{
                      width: `${
                        (summary?.rateCounts[index] / reviews?.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {userId == null ? (
            <></>
          ) : (
            <>
              <button
                className="accent"
                onClick={() => {
                  setReviewDialogOpen(true);
                }}
              >
                Add review
              </button>
              <Dialog
                header="Add review"
                open={reviewDialogOpen}
                onClosed={() => setReviewDialogOpen(false)}
              >
                <AddReviewForm
                  userId={userId}
                  productId={productId}
                  onCancelled={() => setReviewDialogOpen(false)}
                  onSubmitted={() => setReviewDialogOpen(false)}
                ></AddReviewForm>
              </Dialog>
            </>
          )}
        </div>
        <div className="reviews-comments">
          {reviews?.slice(0, MAX_REVIEWS).map((review, index) => (
            <Review review={review} key={index} />
          ))}
          <button
            onClick={() => {
              executeCommand("test", {
                arg1: "caps",
                arg2: "zaloz",
                arg3array: ["student", "paka"],
                arg4array: [1, 2, 3],
              });
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
              {product?.latestVersion?.minRamMib}MB
            </li>
            <li>
              <span className="spec-type">Disk space:&nbsp;</span>
              {product?.latestVersion?.minDiskMib}MB
            </li>
            <li>
              <span className="spec-type">CPU:&nbsp;</span>
              {product?.latestVersion?.minCpu}MHz
            </li>
          </ul>
        </div>

        <div className="additional-info-box">
          <h3>Additional information</h3>
          <li>
            <span className="spec-type">Version:&nbsp;</span>
            {product?.latestVersion?.version}MB
          </li>
          <li>
            <span className="spec-type">Updated:&nbsp;</span>
            {product?.latestVersion?.createdAt}MHz
          </li>
        </div>
      </section>
    </article>
  );
}

export default ProductPage;
