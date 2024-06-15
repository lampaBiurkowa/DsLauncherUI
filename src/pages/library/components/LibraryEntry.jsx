import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import Popup, { PopupAlignment } from "@/components/popup/Popup";
import Dialog from "@/components/dialog/Dialog";
import Installer from "@/components/installer/Installer";
import "./LibraryEntry.scss";

const service = new DsLauncherServiceClient();

function LibraryEntry({ product, isInstalled, hasUpdate, secondary = "" }) {
  const [dialogOpen, setDialogOpen] = useState(false);
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
                setDialogOpen(true);
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
                <button className="small menuitem">
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
        open={dialogOpen}
        onClosed={() => setDialogOpen(false)}
        header={`Install - ${product?.model?.name}`}
      >
        <Installer
          onCancelled={() => setDialogOpen(false)}
          onConfirmed={(lib) => {
            //MKZLIWE ZE TO NI DZIALA :D/
            service.install(product?.model?.guid, lib.Path);
          }}
        ></Installer>
      </Dialog>
    </>
  );
}

export default LibraryEntry;
