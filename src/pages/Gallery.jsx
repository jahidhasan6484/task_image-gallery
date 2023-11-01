import { useEffect, useRef, useState } from "react";
import imagesData from "../assets/data";
import Navbar from "../components/Navbar";

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
        <div className="relative rounded-lg flex justify-center items-center border-2 border-dotted border-gray-500 opacity-50 hover:opacity-50 h-80 w-full md:h-48 xl:h-80 ">
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label htmlFor="image-upload" className="cursor-pointer text-center">
            <svg
              xmlns="https://www.shutterstock.com/image-vector/camera-plus-icon-thin-light-regular-2110815221"
              className="h-16 w-16 mx-auto text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-gray-500 text-center">Add Images</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

// Working Fine
