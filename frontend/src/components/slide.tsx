import image1 from "../assets/x1.png";
import image2 from "../assets/x2.png";
import image3 from "../assets/x3.png";
import image4 from "../assets/x4.png";
import image5 from "../assets/x5.png";
import "./ImageComponent.css";

const ImageComponent = ({ index }: { index: number }) => {
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
        className="hover-effect w-[500px]"
      />
    </div>
  );
};

export default ImageComponent;
