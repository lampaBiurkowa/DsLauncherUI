import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { NavLink } from "react-router-dom";
import useProduct from "./hooks/useProduct";
import AspectRatio from "@/components/aspect-ratio/AspectRatio";
import Shelf from "@/components/shelf/Shelf";
import Dialog from "@/components/dialog/Dialog";
import Carousel from "@/components/carousel/Carousel";
import useReviews from "./hooks/useReviews";
import Review from "./components/Review";
import useSummary from "./hooks/useSummary";
import useDeveloperForProduct from "./hooks/useDeveloperForProduct";
import AddReviewForm from "./components/AddReviewForm";
import AllReviewsView from "./components/AllReviewsView";
import ProductActionButton from "./components/ProductActionButton";
import "./ProductPage.scss";
import usePegi from "./hooks/usePegi";
import useUserSubscribed from "./hooks/useUserSubscribed";

function ProductPage() {
  const { id: productGuid } = useParams();
  const { currentUser } = useContext(UserContext);

  const product = useProduct(productGuid);
  const reviews = useReviews(productGuid, 0, 3);
  const pegi = usePegi(productGuid);
  const summary = useSummary(productGuid);
  const developer = useDeveloperForProduct(productGuid);
  const userSubscribed = useUserSubscribed(developer);

  const [addReviewDialogOpen, setAddReviewDialogOpen] = useState();
  const [galleryDialogOpen, setGalleryDialogOpen] = useState();
  const [allReviewsDialogOpen, setAllReviewsDialogOpen] = useState();

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
            <NavLink
              className="developer"
              to={`/developer/${developer?.model?.guid}`}
            >
              {developer?.model?.name}
            </NavLink>
            {currentUser ? (
              <ProductActionButton product={product}></ProductActionButton>
            ) : (
              <span className="price">{userSubscribed ? 0 : product?.model?.price}₽</span>
            )}
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
            <span>({summary?.rateCounts.reduce((x, y) => x + y, 0)})</span>
          </div>
          <div className="review-details">
            {[1, 2, 3, 4, 5].map((rate, index) => (
              <div className="rate-counter" key={rate}>
                <span className="rate">{rate}</span>
                <span className="count">({summary?.rateCounts[index]})</span>
                <div className="bar">
                  <div
                    className="fill bar"
                    style={{
                      width: `${
                        (summary?.rateCounts[index] /
                          summary?.rateCounts.reduce((x, y) => x + y, 0)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {currentUser ? (
            <>
              <button
                className="accent"
                onClick={() => {
                  setAddReviewDialogOpen(true);
                }}
              >
                Add review
              </button>
              <Dialog
                header="Add review"
                open={addReviewDialogOpen}
                onClosed={() => setAddReviewDialogOpen(false)}
              >
                <AddReviewForm
                  userId={currentUser.id}
                  productId={productGuid}
                  onCancelled={() => setAddReviewDialogOpen(false)}
                  onSubmitted={() => setAddReviewDialogOpen(false)}
                ></AddReviewForm>
              </Dialog>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="reviews-comments">
          {reviews?.map((review, index) => (
            <Review review={review} key={index} />
          ))}
          <button onClick={() => setAllReviewsDialogOpen(true)}>
            Show all reviews
          </button>
          <Dialog
            header="Reviews"
            open={allReviewsDialogOpen}
            onClosed={() => setAllReviewsDialogOpen(false)}
          >
            <AllReviewsView productId={productGuid} />
          </Dialog>
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
          <li>
            <img src={pegi} alt="Classification" height="20px" />
          </li>
        </div>
      </section>
    </article>
  );
}

export default ProductPage;
