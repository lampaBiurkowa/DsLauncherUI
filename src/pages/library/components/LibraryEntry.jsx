import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import Popup, { PopupAlignment } from "@/components/popup/Popup";
import Dialog from "@/components/dialog/Dialog";
import Installer from "@/components/installer/Installer";
import "./LibraryEntry.scss";

const service = new DsLauncherServiceClient();

function LibraryEntry({ product, isInstalled, hasUpdate, secondary = "" }) {
  const [installDialogOpen, setInstallDialogOpen] = useState(false);
  const [uninstallDialogOpen, setUninstallDialogOpen] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef();

  return (
    <>
      <div className="library-entry">
        <img src={product?.static?.Icon} alt="App Icon" />
        <span className="title">{product?.model?.name}</span>
        <span className="secondary">{secondary}</span>
        <div className="actions">
          {hasUpdate ? <button className="accent">Update</button> : <></>}
          {isInstalled ? (
            <button
              className="accent"
              onClick={() => {
                service.execute(product?.model?.guid);
              }}
            >
              Run
            </button>
          ) : (
            <button
              className="accent"
              onClick={() => {
                setInstallDialogOpen(true);
              }}
            >
              Install
            </button>
          )}
          <button
            ref={popupRef}
            className="plain dropdown-button"
            onClick={() => setPopupOpen(true)}
          >
            <i className="las la-ellipsis-h" />
          </button>
          <Popup
            targetRef={popupRef}
            open={popupOpen}
            setOpen={setPopupOpen}
            alignment={PopupAlignment.Right}
          >
            <div>
              <NavLink
                className="button small menuitem"
                to={`/store/product/${product?.model?.guid}`}
              >
                <i className="las la-shopping-cart" />
                <span>Store page</span>
              </NavLink>
              {isInstalled ? (
                <button
                  className="small menuitem"
                  onClick={() => {
                    setUninstallDialogOpen(true);
                  }}
                >
                  <i className="las la-trash" />
                  <span>Uninstall</span>
                </button>
              ) : (
                <></>
              )}
            </div>
          </Popup>
        </div>
      </div>

      <Dialog
        open={installDialogOpen}
        onClosed={() => setInstallDialogOpen(false)}
        header={`Install - ${product?.model?.name}`}
      >
        <Installer
          onCancelled={() => setInstallDialogOpen(false)}
          onConfirmed={(lib) => {
            service.install(product?.model?.guid, lib.Path);
            setInstallDialogOpen(false);
          }}
        ></Installer>
      </Dialog>
      <Dialog
        open={uninstallDialogOpen}
        onClosed={() => setUninstallDialogOpen(false)}
        header={`Uninstall - ${product?.model?.name}`}
      >
        <div className="message-box">
          <i className="las la-exclamation-triangle" />
          <span>Are you sure you want to uninstall this application?</span>
          <div className="actions">
            <button
              onClick={() => {
                setUninstallDialogOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="accent"
              onClick={() => {
                service.uninstall(product?.model?.guid);
                setUninstallDialogOpen(false);
              }}
            >
              Uninstall
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default LibraryEntry;
