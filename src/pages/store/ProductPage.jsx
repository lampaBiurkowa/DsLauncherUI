import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
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
import usePegi from "./hooks/usePegi";
import "./ProductPage.scss";
import useOwnsProduct from "./hooks/useOwnsProduct";

function ProductPage() {
  const { id: productGuid } = useParams();
  const { currentUser } = useContext(UserContext);

  const [refresh, setRefresh] = useState(true);
  const product = useProduct(productGuid);
  const reviews = useReviews(productGuid, 0, 3);
  const pegi = usePegi(productGuid);
  const summary = useSummary(productGuid, refresh);
  const developer = useDeveloperForProduct(productGuid);
  const ownsProduct = useOwnsProduct(productGuid);

  const [addReviewDialogOpen, setAddReviewDialogOpen] = useState();
  const [galleryDialogOpen, setGalleryDialogOpen] = useState();
  const [allReviewsDialogOpen, setAllReviewsDialogOpen] = useState();

  const handleReviewSubmitted = () => {
    setRefresh(true);
    setAddReviewDialogOpen(false);
  };
  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <article>
      <AspectRatio aspectRatio={12 / 5}>
        <div
          className="product-hero"
          style={{
            backgroundImage: `linear-gradient(
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
              <ProductActionButton
                product={product}
                developer={developer}
              ></ProductActionButton>
            ) : (
              <span className="price">{product?.model?.price}₽</span>
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
          {currentUser && ownsProduct ? (
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
                  onSubmitted={handleReviewSubmitted}
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

        <div>
          <h3>Additional information</h3>
          <div className="additional-info-container">
            <div>
              <i class="las la-box"></i>
              <span className="info-type">Version</span>
              <span className="info-value">
                {product?.latestVersion?.version}
              </span>
            </div>
            <div>
              <i class="las la-calendar"></i>
              <span className="info-type">Last updated</span>
              <span className="info-value">
                {new Date(
                  product?.latestVersion?.createdAt
                ).toLocaleDateString()}
              </span>
            </div>
            {pegi ? (
              <div>
                <div>
                  <img
                    src={pegi}
                    alt="Classification"
                    style={{
                      width: "20px",
                      height: "20px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <span className="info-type">Age classification</span>
                <span className="info-value">PEGI 😐</span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div>
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
              {product?.latestVersion?.minCpu}
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}

export default ProductPage;
