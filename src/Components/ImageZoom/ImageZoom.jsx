import React, { useState, useRef } from "react";
import "./ImageZoom.css"; // Add a separate CSS file for styling

const ImageZoom = ({ imageUrl }) => {
  const [zoomStyle, setZoomStyle] = useState({
    display: "none",
    zoomX: "0%",
    zoomY: "0%",
  });

  const imageRef = useRef(null);

  const handleMouseMove = (event) => {
    const { offsetX, offsetY, target } = event.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const xPercent = (offsetX * 100) / offsetWidth;
    const yPercent = (offsetY * 100) / offsetHeight;

    setZoomStyle({
      display: "block",
      zoomX: `${xPercent}%`,
      zoomY: `${yPercent}%`,
    });
  };

  const handleMouseOut = () => {
    setZoomStyle({ display: "none", zoomX: "0%", zoomY: "0%" });
  };

  return (
    <div
      ref={imageRef}
      className="image-zoom"
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      style={{
        "--url": `url(${imageUrl})`,
        "--zoom-x": zoomStyle.zoomX,
        "--zoom-y": zoomStyle.zoomY,
        "--display": zoomStyle.display,
      }}
    >
      <img src={imageUrl} alt="Product" />
    </div>
  );
};

export default ImageZoom;
