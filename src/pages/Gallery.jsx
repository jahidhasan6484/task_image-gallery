import { useEffect, useRef, useState } from "react";
import imagesData from "../assets/data";

const Gallery = () => {
  const [images, setImages] = useState([]);

  const dragStartIndex = useRef(null);
  const dragEndIndex = useRef(null);

  useEffect(() => {
    setImages(imagesData);
  }, []);

  const handleDragStart = (_index) => {
    dragStartIndex.current = _index;
  };
  const handleDragOver = (_index) => {
    dragEndIndex.current = _index;

    // dropAndReplaceImage();

    const _allImages = [...images];

    const draggedImage = _allImages.splice(dragStartIndex.current, 1)[0];
    _allImages.splice(dragEndIndex.current, 0, draggedImage)[0];

    // dragStartIndex.current = null;
    // dragEndIndex.current = null;

    setImages(_allImages);
  };

  const dropAndReplaceImage = () => {
    const _allImages = [...images];

    const draggedImage = _allImages.splice(dragStartIndex.current, 1)[0];
    _allImages.splice(dragEndIndex.current, 0, draggedImage)[0];

    dragStartIndex.current = null;
    dragEndIndex.current = null;

    setImages(_allImages);
  };

  return (
    <div>
      <h1>Gallery</h1>

      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => {
          return (
            <div
              draggable
              key={index}
              className={
                index === 0 ? "col-span-2 row-span-2 border-2" : "border-2"
              }
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragOver(index)}
              onDragEnd={() => dropAndReplaceImage()}
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
