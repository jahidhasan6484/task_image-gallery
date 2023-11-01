const AddImage = ({ handleImageUpload }) => {
  return (
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
        <p className="font -gray-500 text-center">Add Images</p>
      </label>
    </div>
  );
};

export default AddImage;
