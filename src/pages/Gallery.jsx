import { useEffect, useState } from "react";
import imagesData from "../assets/data";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(imagesData);
  }, []);

  return (
    <div>
      <h1>Gallery</h1>

      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className={
                index === 0 ? "col-span-2 row-span-2 border-2" : "border-2"
              }
            >
              <img src={image} alt={image}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
