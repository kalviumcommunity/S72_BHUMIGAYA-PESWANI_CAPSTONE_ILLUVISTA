import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-gray-800">🎨 Virtual Art Gallery</h1>
      <p className="text-lg text-gray-600 mt-4">
        Explore a stunning collection of digital and physical artworks in an interactive 3D space.
      </p>
      <Link
        to="/products"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700"
      >
        Get Started
      </Link>
      <Link
        to="/upload"
        className="mt-3 px-6 py-2 bg-gray-800 text-white rounded-lg text-md shadow hover:bg-gray-900"
      >
        Upload Artwork
      </Link>
      <div className="mt-6 flex gap-4">
        <Link to="/login" className="px-4 py-2 border border-gray-400 rounded">Login</Link>
        <Link to="/register" className="px-4 py-2 border border-gray-400 rounded">Register</Link>
      </div>
    </div>
  );
};

export default Home;
  