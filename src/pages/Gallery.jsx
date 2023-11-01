import { useEffect, useRef, useState } from "react";
import imagesData from "../assets/data";
import Navbar from "../components/Navbar";
import AddImage from "../components/AddImage";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

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

  const handleCheckboxChange = (name) => {
    const selected = selectedImages.includes(name)
      ? selectedImages.filter((n) => n !== name)
      : [...selectedImages, name];

    setSelectedImages(selected);
  };

  const handleDeleteSelectedImages = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.name)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const unselectAll = () => {
    setSelectedImages([]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImages([...images, { name: imageUrl, url: imageUrl }]);
    }
  };

  return (
    <div className="flex flex-col py-4 pb-16 px-2 md:px-12 xl:px-16 gap-6">
      <Navbar
        selectedIndexes={selectedImages}
        handleDeleteSelectedImages={handleDeleteSelectedImages}
        unselectAll={unselectAll}
      />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border">
        {images.map(({ name, url }, index) => {
          const isAlreadySelected = selectedImages.includes(name);
          const isHovered = hoveredIndex === index;
          return (
            <div
              draggable
              key={index}
              className={`${
                index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
              } relative rounded-lg border border-gray-300 cursor-pointer ${
                isAlreadySelected
                  ? "opacity-50"
                  : isHovered
                  ? "hover: filter brightness-50"
                  : "hover:opacity-50"
              } `}
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragOver(index)}
              onDragEnd={() => dropAndReplaceImage()}
              onDragOver={(event) => event.preventDefault()}
            >
              <div
                className="absolute p-4 top-0 left-0 w-full h-full"
                onMouseEnter={() => {
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                }}
              >
                {isAlreadySelected ? (
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => handleCheckboxChange(name)}
                    className="cursor-pointer m-2 w-6 h-6"
                  />
                ) : isHovered ? (
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(name)}
                    onChange={() => handleCheckboxChange(name)}
                    className="cursor-pointer m-2 w-6 h-6"
                  />
                ) : null}
              </div>
              <img src={url} alt={name} className="w-full h-full rounded-lg" />
            </div>
          );
        })}
        <AddImage handleImageUpload={handleImageUpload} />
      </div>
    </div>
  );
};

export default Gallery;

// Working Fine
