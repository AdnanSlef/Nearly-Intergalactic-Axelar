import React from "react";
import image1 from "./x1.png";
import image2 from "./x2.png";
import image3 from "./x3.png";
import image4 from "./x4.png";
import image5 from "./x5.png";

const ImageComponent = ({ index }) => {
  const images = [image1, image2, image3, image4, image5];

  // Check if the index is valid
  if (index < 0 || index >= images.length) {
    return <div>Invalid index!</div>;
  }

  const selectedImage = images[index];

  return (
    <div>
      <img
        src={selectedImage}
        alt={`Image ${index + 1}`}
        style={{ width: "500px" }}
      />
    </div>
  );
};

export default ImageComponent;
