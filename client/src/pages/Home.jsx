import React from "react";
const Home = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
        <h1 className="text-5xl font-bold text-gray-800">🎨 Virtual Art Gallery</h1>
        <p className="text-lg text-gray-600 mt-4">
          Explore a stunning collection of digital and physical artworks in an interactive 3D space.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700">
          Get Started
        </button>
      </div>
    );
  };
  
  export default Home;
  