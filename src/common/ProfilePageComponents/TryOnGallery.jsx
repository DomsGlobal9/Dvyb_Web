import React from "react";
import { useUserTryons } from "./tryonitems";

export default function TryOnGallery() {
  const { tryons, loading } = useUserTryons();

  if (loading) return <p className="text-center">Loading...</p>;
  if (!tryons.length) return <p className="text-center">No try-ons yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        My Try-On Gallery
      </h2>
      <p className="text-gray-500 mb-6">
        All your virtual try-ons in one place
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tryons.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={item.tryOnImage}
              alt={item.productName}
              className="w-32 h-48 object-contain mb-3"
            />
            <p className="font-semibold text-gray-800">
              {/* {item.productName} */}
            </p>
            {/* <p className="text-sm text-gray-500">{item.garmentName}</p> */}
            <p className="text-xs text-gray-400 mt-1">
              Tried on{" "}
              {item.createdAt
                ? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
                : "Unknown date"}
            </p>

            <div className="mt-3 flex flex-col gap-2 w-full">
              <button className="w-full bg-white text-blue-700 border-blue-200 font-bold text-sm py-1 rounded-lg ">
                Add items to Cart
              </button>
              <button className="w-full bg-blue-600 text-white py-1 rounded-lg text-sm">
                Share Look
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}