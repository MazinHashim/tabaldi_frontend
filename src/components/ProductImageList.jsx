import React, { useState } from 'react';
import { FaPlus, FaTimes, FaSpinner } from 'react-icons/fa';

const ProductImageList = ({ images, baseURL, productProfile, onAddImage, onRemoveImage }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [loadingImageId, setLoadingImageId] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoadingImageId('new');
      try {
        await onAddImage(file);
      } finally {
        setLoadingImageId(null);
      }
    }
  };

  const handleImageClick = (imageSrc) => {
    setPreviewImage(imageSrc);
  };

  const handleRemoveImage = async (image) => {
    setLoadingImageId(image);
    try {
      await onRemoveImage(image);
    } finally {
      setLoadingImageId(null);
    }
  };

  return (
    <div className='product-details grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      <label className="flex items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-400 transition-colors">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        {loadingImageId === 'new' ? (
          <FaSpinner className="text-gray-400 text-4xl animate-spin" />
        ) : (
          <FaPlus className="text-gray-400 hover:text-green-400 text-4xl" />
        )}
      </label>
      
      {images.map((image) => (
        <div key={image} className="relative aspect-square">
          <img
            className="rounded-xl w-full h-full object-cover cursor-pointer"
            src={image ? `${baseURL}/files/get/file/${image}` : productProfile}
            alt="Product"
            onClick={() => handleImageClick(`${baseURL}/files/get/file/${image}`)}
          />
          {loadingImageId === image ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
              <FaSpinner className="text-white text-2xl animate-spin" />
            </div>
          ) : (
            <button
              className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5 hover:bg-green-600 transition-colors"
              onClick={() => handleRemoveImage(image)}
            >
              <FaTimes className="text-sm" />
            </button>
          )}
        </div>
      ))}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Preview" className="max-w-[90%] max-h-[90%] object-contain" />
        </div>
      )}
    </div>
  );
};

export default ProductImageList;