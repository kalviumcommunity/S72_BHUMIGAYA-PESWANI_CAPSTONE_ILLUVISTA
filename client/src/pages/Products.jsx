import React from "react";
import ProductCard from "../components/ProductCard";

const mockProducts = [
  {
    id: "p1",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop",
    name: "Abstract Canvas Art",
    price: 129.99,
    rating: 4,
    description: "Vibrant abstract piece on premium canvas, perfect for modern interiors.",
  },
  {
    id: "p2",
    image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1200&auto=format&fit=crop",
    name: "Sculpted Vase",
    price: 89.0,
    rating: 5,
    description: "Handcrafted ceramic vase with matte finish and minimalist design.",
  },
  {
    id: "p3",
    image: "https://images.unsplash.com/photo-1559058861-51799bcd1ced?q=80&w=1200&auto=format&fit=crop",
    name: "Framed Landscape Print",
    price: 59.5,
    rating: 3,
    description: "High-resolution landscape print in a solid oak frame.",
  },
  {
    id: "p4",
    image: "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?q=80&w=1200&auto=format&fit=crop",
    name: "Modern Table Lamp",
    price: 74.99,
    rating: 4,
    description: "LED table lamp with adjustable brightness and brushed metal finish.",
  },
];

function Products() {
  const [products] = React.useState(mockProducts);

  const handleAddToCart = (productId) => {
    // Placeholder handler; integrate with cart state later
    console.log("Add to cart:", productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Discover curated items for your collection.</p>
        </header>

        {(!products || products.length === 0) ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-700 font-medium">No products available</p>
            <p className="text-gray-500 text-sm mt-1">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                image={p.image}
                name={p.name}
                price={p.price}
                rating={p.rating}
                description={p.description}
                onAddToCart={() => handleAddToCart(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products; 