import { getProduct } from "@/services/CacheService";
import { useServiceListener } from "@/hooks/useServiceListener";
import InfoBar, { InfoBarType } from "@/components/info-bar/InfoBar";
import "./DownloadsPage.scss";

function DownloadsPage() {
  const [products, setProducts] = useState();
  const operations = useServiceListener("get-downloads");

  useEffect(() => {
    (async () => {
      const guids = Object.keys(operations?.Downloads ?? {});
      const products = await Promise.all(
        guids.map(async (guid) => {
          let product = await getProducts(guid);
          product.downloadState = operations.Downloads[guid];
          return product;
        })
      );
      setProducts(products);
    })();
  }, [operations]);

  return (
    <div className="downloads-page">
      <h2>Downloads</h2>
      <ul>
        {products?.length == 0 ? (
          <InfoBar
            type={InfoBarType.Info}
            header="No downloads"
            text="There are no download operations."
          ></InfoBar>
        ) : (
          <></>
        )}
        {products?.map((product, key) => {
          return (
            <div className="download-entry" key={key}>
              <img src={product.static.Icon} alt="App icon" />
              <span className="name">{product.model.name}</span>
              <span className="step">
                {(() => {
                  switch (product.downloadState.Step) {
                    case 0:
                      return `Downloading ${product.downloadState.Percentage.toFixed(
                        0
                      )}%`;
                    case 1:
                      return "Finalizing";
                    default:
                      return "Unknown";
                  }
                })()}
              </span>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${product.downloadState.Percentage ?? 0}%` }}
                />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default DownloadsPage;
