import React, { useEffect, useRef, useState } from "react";
import imagesData from "../assets/data";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

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
  };

  const dropAndReplaceImage = () => {
    const _allImages = [...images];

    const draggedImage = _allImages.splice(dragStartIndex.current, 1)[0];
    _allImages.splice(dragEndIndex.current, 0, draggedImage)[0];

    dragStartIndex.current = null;
    dragEndIndex.current = null;

    setImages(_allImages);
  };

  const handleCheckboxChange = (index) => {
    const selected = selectedIndexes.includes(index)
      ? selectedIndexes.filter((i) => i !== index)
      : [...selectedIndexes, index];

    setSelectedIndexes(selected);
  };

  const handleDeleteSelectedImages = () => {
    const updatedImages = images.filter(
      (_, index) => !selectedIndexes.includes(index)
    );
    setImages(updatedImages);
    setSelectedIndexes([]);
  };

  const galleryTitle = selectedIndexes.length
    ? `select${selectedIndexes.length} ${
        selectedIndexes.length === 1 ? "image" : "images"
      }`
    : "Gallery";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{galleryTitle}</h1>

      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => {
          const isChecked = selectedIndexes.includes(index);
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={index}
              className={
                index === 0
                  ? "col-span-2 row-span-2 border-2 hover:opacity-50 relative"
                  : "border-2 hover:opacity-50 relative"
              }
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragOver(index)}
              onDragEnd={() => dropAndReplaceImage()}
              onDragOver={(event) => event.preventDefault()}
            >
              <div
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                onMouseEnter={() => {
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                }}
              >
                {isHovered && (
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(index)}
                    className="cursor-pointer"
                  />
                )}
              </div>
              <img src={image} alt={image} className="w-full h-full" />
            </div>
          );
        })}
      </div>

      {selectedIndexes.length > 0 && (
        <button
          onClick={handleDeleteSelectedImages}
          className="mt-4 bg-red-500 text-white p-2 rounded cursor-pointer"
        >
          Delete Selected
        </button>
      )}
    </div>
  );
};

export default Gallery;
