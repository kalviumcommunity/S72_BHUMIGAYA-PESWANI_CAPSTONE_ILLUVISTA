import React from "react";

function ProductCard({ image, name, price, rating, description, onAddToCart }) {
  const renderStars = (value) => {
    const normalized = Math.max(0, Math.min(5, Math.floor(Number(value) || 0)));
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`text-yellow-500 ${index < normalized ? '' : 'opacity-30'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col">
      <div className="relative w-full pt-[66%] bg-gray-50 overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">${price?.toFixed ? price.toFixed(2) : price}</div>
          <div className="flex items-center" aria-label={`Rating ${rating} out of 5`}>
            {renderStars(rating)}
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="mt-auto pt-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard; 