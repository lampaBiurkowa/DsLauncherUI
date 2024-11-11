import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import AspectRatio from "@/components/aspect-ratio/AspectRatio";
import Shelf from "@/components/shelf/Shelf";
import Dialog from "@/components/dialog/Dialog";
import Carousel from "@/components/carousel/Carousel";
import "./DeveloperNdibPage.scss";
import { getRepositoryMetadata } from "@/services/NdibService";
import useBase64Image from "./hooks/useBase64Image";
import useBase64ImageCollection from "./hooks/useBase64ImageCollection";

function DeveloperNdibPage() {
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const path = searchParams.get("path");
  const [productData, setRepoInfo] = useState(null);

  useEffect(() => {
    async function fetchRepoInfo() {
      if (path) {
        const metadata = await getRepositoryMetadata(path);
        setRepoInfo(metadata);
      }
    }
    fetchRepoInfo();
  }, [path]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepoInfo((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const icon = useBase64Image(`${path}/${productData?.icon}`, productData?.icon);
  const backgroundImage = useBase64Image(`${path}/${productData?.background}`, productData?.background);
  const images = useBase64ImageCollection(productData?.images.map(x => `${path}/${x}`), productData?.images);
  // const minCpu = 

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
            url("data:image/png;base64,${backgroundImage}")`,
          }}
        >
          <div className="product-header">
            <input
              className="title-input"
              type="text"
              name="name"
              value={productData?.name}
              placeholder="Product Name"
              onChange={handleChange}
            />
            <NavLink className="developer" to="#">
              Developer Preview
            </NavLink>
            <input
              className="price"
              type="number"
              name="price"
              value={productData?.price || ""}
              placeholder="Price"
              onChange={handleChange}
              style={{
                width: "80px",
                textAlign: "right",
              }}
            />
            <span>₽</span>
          </div>
        </div>
      </AspectRatio>

      <section className="description">
        <img src={`data:image/png;base64,${icon}`}/>
        <h2>About</h2>
        <textarea
          className="description-input"
          name="description"
          value={productData?.description}
          placeholder="Product Description"
          onChange={handleChange}
        />
      </section>

      <section className="screenshots">
        <Shelf title="Screenshots">
          {images?.map((image, index) => (
            <img
              src={`data:image/png;base64,${image}`}
              alt="Screenshot"
              className="screenshot"
              key={index}
              onClick={() => setGalleryDialogOpen(true)}
            />
          ))}
        </Shelf>
        <Dialog
          open={galleryDialogOpen}
          header="Screenshots"
          onClosed={() => setGalleryDialogOpen(false)}
        >
          <div className="screenshot-carousel-container">
            <Carousel auto={false}>
              {images?.map((image, index) => (
                <img src={`data:image/png;base64,${image}`} alt="Screenshot" key={index} />
              ))}
            </Carousel>
          </div>
        </Dialog>
      </section>

      <section className="details">
        <h2>Details</h2>

        <div>
          <h3>Additional information</h3>
          <div className="additional-info-container">
            <div>
              <i className="las la-box"></i>
              <span className="info-type">Version</span>
              <input
                type="text"
                name="version"
                value={productData?.latestVersion?.version || ""}
                onChange={(e) =>
                  handleChange({ target: { name: "version", value: e.target.value } })
                }
              />
            </div>
            <div>
              <i className="las la-calendar"></i>
              <span className="info-type">Last updated</span>
              <input
                type="date"
                name="createdAt"
                value={productData?.latestVersion?.createdAt ? 
                  new Date(productData.latestVersion.createdAt).toISOString().split('T')[0] : ''}
                onChange={(e) =>
                  handleChange({ target: { name: "createdAt", value: e.target.value } })
                }
              />
            </div>
            {productData?.contentClassification ? (
              <div>
                <div>
                  <img
                    src={`/img/pegi${productData?.contentClassification}.jpg `}
                    alt="Classification"
                    style={{
                      width: "20px",
                      height: "20px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <span className="info-type">Age classification</span>
                <select
                  name="contentClassification"
                  value={productData?.contentClassification || ""}
                  onChange={(e) =>
                    handleChange({ target: { name: "contentClassification", value: e.target.value } })
                  }
                >
                  <option value="">Select Age Classification</option>
                  <option value="3">3+</option>
                  <option value="7">7+</option>
                  <option value="12">12+</option>
                  <option value="16">16+</option>
                  <option value="18">18+</option>
                </select>
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
              <input
                type="number"
                name="minRamMib"
                value={productData?.minRamMib || ""}
                onChange={(e) => {
                  handleChange({ target: { name: "minRamMib", value: e.target.value } })
                }
              }
              />
              MB
            </li>
            <li>
              <span className="spec-type">Disk space:&nbsp;</span>
              <input
                type="number"
                name="minDiskMib"
                value={productData?.minDiskMib || ""}
                onChange={(e) =>
                  handleChange({ target: { name: "minDiskMib", value: e.target.value } })
                }
              />
              MB
            </li>
            <li>
              <span className="spec-type">CPU:&nbsp;</span>
              <input
                type="text"
                name="minCpu"
                value={productData?.minCpu || ""}
                onChange={(e) =>
                  handleChange({ target: { name: "minCpu", value: e.target.value } })
                }
              />
            </li>
          </ul>
        </div>
      </section>

    </article>
  );
}

export default DeveloperNdibPage;
