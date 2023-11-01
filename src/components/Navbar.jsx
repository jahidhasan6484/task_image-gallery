import React from "react";

const Navbar = ({
  selectedIndexes,
  handleDeleteSelectedImages,
  unselectAll,
}) => {
  const title = selectedIndexes.length ? (
    <div className="flex gap-2">
      <input
        onClick={unselectAll}
        type="checkbox"
        checked={true}
        className="cursor-pointer w-6 h-6"
      />
      {`${selectedIndexes.length} ${
        selectedIndexes.length === 1 ? "File" : "Files"
      } Selected`}
    </div>
  ) : (
    "Gallery"
  );

  return (
    <div className="flex py-4 justify-between border-b-2 border-gray-400">
      <p className="font-extrabold text-lg">{title}</p>
      {selectedIndexes.length > 0 && (
        <p
          className="text-red-600 cursor-pointer hover:underline"
          onClick={handleDeleteSelectedImages}
        >
          Delete files
        </p>
      )}
    </div>
  );
};

export default Navbar;
