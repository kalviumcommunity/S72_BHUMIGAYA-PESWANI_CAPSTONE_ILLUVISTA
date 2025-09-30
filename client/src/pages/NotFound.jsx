import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">The page you’re looking for doesn’t exist.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Go Home</Link>
        <Link to="/products" className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300">Browse Products</Link>
      </div>
    </div>
  );
}

export default NotFound; 