import React from 'react';
import "./ImagePopup.scss";

const ImagePopup = ({ image, onClose }) => {
    return (
      <div className="image-popup">
        <div className="popup-content">
          <img src={image} alt="Enlarged Screenshot" />
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default ImagePopup;