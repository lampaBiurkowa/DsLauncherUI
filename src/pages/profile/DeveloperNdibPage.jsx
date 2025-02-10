import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import AspectRatio from "@/components/aspect-ratio/AspectRatio";
import Shelf from "@/components/shelf/Shelf";
import Dialog from "@/components/dialog/Dialog";
import Carousel from "@/components/carousel/Carousel";
import "./DeveloperNdibPage.scss";
import { getRepositoryFiles, getRepositoryMetadata, publish, save } from "@/services/NdibService";
import useBase64Image from "./hooks/useBase64Image";
import useBase64ImageCollection from "./hooks/useBase64ImageCollection";
import useFileDialog from "@/hooks/useFileDialog";
import { UserContext } from "@/contexts/UserContextProvider";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

const api = new DsLauncherApiClient();
function DeveloperNdibPage() {
  const { currentUser } = useContext(UserContext);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const path = searchParams.get("path");
  const [selectedPlatform, setSelectedPlatform] = useState("core");
  const [productData, setRepoInfo] = useState(null);
  const [devs, setDevs] = useState([]);
  const [devGuid, setDevGuid] = useState('');
  const [executables, setExecutables] = useState({});
  const trimLeadingSlash = (path) => path.replace(/^\/+/, '');

  const toggleExecutable = (filePath, platform) => {
    setExecutables((prevExecutables) => {
      const updatedExecutables = { ...prevExecutables };
      if (updatedExecutables[platform] === filePath) {
        delete updatedExecutables[platform];
      } else {
        updatedExecutables[platform] = filePath;
      }

      setRepoInfo((prevProductData) => {
        if (!prevProductData) return prevProductData;
        const updatedProductData = { ...prevProductData };
        
        switch (platform) {
          case "core": //hzd todo zmienic kiedys :D/
          case "windows":
            updatedProductData.windowsExePath = updatedExecutables[platform] || "";
            break;
          case "mac":
            updatedProductData.macExePath = updatedExecutables[platform] || "";
            break;
          case "linux":
            updatedProductData.linuxExePath = updatedExecutables[platform] || "";
            break;
          default:
            break;
        }
        return updatedProductData;
      });

      return updatedExecutables;
    });
  };

  const handleSelectDevChange = (event) => {
    setDevGuid(event.target.value);
  };
  
  useEffect(() => {
    (async () => {
      setDevs(await api.getDeveloperByUser(currentUser.guid));
    })();
  }, []);
  
  const { openedFiles: iconFile, showDialog: showIconDialog } = useFileDialog([
    {
      name: "Images",
      extensions: ["png", "jpg"],
    }
  ],
  false,
  path);

  useEffect(() => {
    if (iconFile.length == 1) {
      if (iconFile[0].startsWith(path)) {
        handleChange({ target: { name: "icon", value: trimLeadingSlash(iconFile[0].substring(path.length)) } })
      } else {
        console.error("Path is outside of the ndib repository")
      }
    }
  }, [iconFile]);

  const { openedFiles: bgFile, showDialog: showBgDialog } = useFileDialog([
    {
      name: "Images",
      extensions: ["png", "jpg"],
    },
  ],
  false,
  path);

  useEffect(() => {
    if (bgFile.length == 1) {
      if (bgFile[0].startsWith(path)) {
        handleChange({ target: { name: "background", value: trimLeadingSlash(bgFile[0].substring(path.length)) } })
      } else {
        console.error("Path is outside of the ndib repository")
      }
    }
  }, [bgFile]);


  const { openedFiles: screenshotFile, showDialog: showScreenshotDialog } = useFileDialog([
    {
      name: "Images",
      extensions: ["png", "jpg"],
    },
  ],
  false,
  path);

  useEffect(() => {
    if (screenshotFile.length == 1) {
      if (screenshotFile[0].startsWith(path)) {
        const newImagesArray = [...productData.images, trimLeadingSlash(screenshotFile[0].substring(path.length))];
        handleChange({ target: { name: "images", value: newImagesArray } });
      } else {
        console.error("Path is outside of the ndib repository")
      }
    }
  }, [screenshotFile]);

  useEffect(() => {
    async function fetchRepoInfo() {
      if (path) {
        const metadata = await getRepositoryMetadata(path);
        setRepoInfo(metadata);
        setExecutables({
          core: metadata.windowsExePath || "", 
          windows: metadata.windowsExePath || "",
          mac: metadata.macExePath || "",
          linux: metadata.linuxExePath || "",
        });
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
  const [productFilesData, setRepoFilesInfo] = useState(null);

  useEffect(() => {
    async function fetchRepoInfo() {
      if (path) {
        const filesData = await getRepositoryFiles(path);
        setRepoFilesInfo(filesData);
      }
    }
    fetchRepoInfo();
  }, [path]);

  const { openedFiles: productFile, showDialog: showProductFileDialog } = useFileDialog([
    {
      name: "Game files",
      extensions: ["*"],
    },
  ],
  false,
  path);

  useEffect(() => {
    if (productFile.length > 0) {
      const validFiles = productFile.filter(file => file.startsWith(path));
      
      if (validFiles.length > 0) {
        setRepoFilesInfo((prevFilesData) => ({
          ...prevFilesData,
          [selectedPlatform]: [
            ...(prevFilesData[selectedPlatform] || []), 
            ...validFiles.map(file => trimLeadingSlash(file.substring(path.length)))
          ],
        }));
      } else {
        console.error("All paths are outside of the ndib repository");
      }
    }
  }, [productFile]);
  
  const removeFile = (filePath, platform) => {
    setRepoFilesInfo((prevFilesData) => {
      if (!prevFilesData[platform]) return prevFilesData; 
  
      const updatedFiles = prevFilesData[platform].filter((file) => file !== filePath);
            return {
        ...prevFilesData,
        [platform]: updatedFiles,
      };
    });
  };
  const renderFileTree = (filesData) => {
    const getFileIcon = (platform) => {
      switch (platform) {
        case "core":
          return "/img/core.jpg";
        case "windows":
          return "/img/windows.jpg";
        case "linux":
          return "/img/linux.jpg";
        case "mac":
          return "/img/mac.jpg";
        default:
          return "/img/file.jpg";
      }
    };
  
    const renderDirectoryStructure = (filePath, platform) => {
      const fileMame = filePath.split("/").pop();
      return (
        <li key={filePath} className="file-tree-item">
          <div className="file-tree-entry">
            <img src={getFileIcon(platform)} style={{height:24}} alt={platform} className="file-icon" onClick={
              () => removeFile(filePath, platform)
              } />
            <span
              style={{ color: executables[platform] === fileMame ? "green" : "inherit", cursor: "pointer" }}
              onClick={() => toggleExecutable(fileMame, platform)}
            >
              {fileMame}
            </span>
          </div>
        </li>
      );
    };
  
    const buildFileTree = (filesData) => {
      const fileTree = {};
  
      Object.entries(filesData).forEach(([platform, files]) => {
        files.forEach((filePath) => {
          const pathParts = filePath.split("/");
  
          let currentNode = fileTree;
          pathParts.forEach((part, index) => {
            if (!currentNode[part]) {
              currentNode[part] = index === pathParts.length - 1 ? { platform } : {};
            }
            currentNode = currentNode[part];
          });
        });
      });
  
      return fileTree;
    };
  
    const renderTreeNodes = (node, parentPath = "") => {
      return Object.keys(node).map((key) => {
        const fullPath = `${parentPath}/${key}`;
        const isFile = node[key].platform;
  
        if (isFile) {
          return renderDirectoryStructure(fullPath, node[key].platform);
        }
  
        return (
          <li key={fullPath} className="file-tree-folder">
            <div className="folder-name">{key}</div>
            <ul className="folder-contents">
              {renderTreeNodes(node[key], fullPath)}
            </ul>
          </li>
        );
      });
    };
  
    const fileTree = buildFileTree(filesData);
    return (
      <div className="file-tree">
        <ul className="file-tree-root">
          {renderTreeNodes(fileTree)}
        </ul>
      </div>
    );
  };
  
  
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
        <div
          onClick={() => showBgDialog()} style={{fontSize: 64, color: "magenta"}}>
        <i className="las la-edit"></i>
        </div>
    <button onClick={() => {
      save(productData, productFilesData, path);
    }}>Save</button>

Devs:
<select onChange={handleSelectDevChange}>
      {devs.map((option, index) => (
        <option key={index} value={option.guid}>
          {option.name}
        </option>
      ))}
    </select>
    <button onClick={() => {
      publish(devGuid, path);
    }}>Publish</button>
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
              value={productData?.price || 0.0}
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
        <img src={`data:image/png;base64,${icon}`} onClick={() => {
          showIconDialog();
        }}/>
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
            <div>
            <img
              src={`data:image/png;base64,${image}`}
              alt="Screenshot"
              className="screenshot"
              key={index}
              onClick={() => setGalleryDialogOpen(true)}
            />


          <button
          onClick={() => {
            const newImagesArray = productData.images.filter((_, i) => i !== index);
            handleChange({ target: { name: "images", value: newImagesArray } });
          }}
          style={{color:"red"}}
        >
          <div>
            <i className="las la-trash"></i>
          </div>
          <span>Remove</span>
        </button>
        </div>
          ))}
          <img src="/img/icon.png" alt="Upload" key={images?.length} onClick={
            () => showScreenshotDialog()
          }/>
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
        {//TODO UNCOMMENT<h2>Details</h2>
        }

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
        <section className="file-tree">
        <h2>File Tree</h2>
        <div>
          <label>Select Platform: </label>
          <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
            <option value="core">Core</option>
            <option value="windows">Windows</option>
            <option value="linux">Linux</option>
            <option value="mac">Mac</option>
          </select>
          <button onClick={() => showProductFileDialog()}>Add File</button>
        </div>
        {productFilesData ? renderFileTree(productFilesData) : <p>Loading file tree...</p>}
      </section>

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
