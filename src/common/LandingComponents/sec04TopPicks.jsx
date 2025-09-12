import React from "react";
import TopPicksBanner from '../../assets/B2Bassets/Banners/TopPicksBanner.png'

const products = [
  {
    id: 1,
    title: "Pastel Saree",
    description: "Light colors with soft stripes",
    price: "₹2,899",
    image: "https://res.cloudinary.com/doiezptnn/image/upload/v1756719698/Image_dnl7fa.png",
    favorite: true,
  },
  {
    id: 2,
    title: "Blue Frock",
    description: "Light colors with soft stripes",
    price: "₹2,899",
    image: "https://res.cloudinary.com/doiezptnn/image/upload/v1756719699/Image_1_dwbcsy.png",
    favorite: false,
  },
  {
    id: 3,
    title: "Dark Blue Dupatta",
    description: "Light colors with soft stripes",
    price: "₹2,899",
    image: "https://res.cloudinary.com/doiezptnn/image/upload/v1756719702/Image_2_mpufiy.png",
    favorite: false,
  },
];

const TopPicks = () => {
  return (
    <section className="pt-6 py-10  from-blue-50 to-white">
      <div>
        {/* Header Section */}
              <img src={TopPicksBanner} alt="" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-12 mt-10">
        {products.map((product, index) => (
          <div key={product.id} className="relative  z-10 bg-white rounded-2xl  p-4">
            {/* Rank Number */}
           <span className="absolute -left-2 -top-4  text-6xl font-bold text-blue-200 opacity-50">
              {index + 1}
            </span>

              {/* <div className="relative  grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-12 mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
    
        {products.map((product, index) => (
      <div  key={product.id} className="relative top-4 left-4 bg-white rounded-2xl  p-4">
        <span className="text-8xl font-bold text-gray-200 select-none opacity-40">
          {index + 1}
        </span>
       */}

            {/* Favorite + Cart */}
            <div className="absolute top-4 right-4 flex space-between space-x-2">
              <button className="text-red-500">{product.favorite ? "❤️" : "🤍"}</button>
              <button className="text-gray-600">🛒</button>
            </div>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />

            {/* Details */}
            
            <h3 className="text-lg font-semibold mt-4">{product.title}</h3>
            <div className="flex justify-between">

            <div>

            <p className="text-sm mt-2 text-gray-500">{product.description}</p>
            <p className="text-lg font-bold mt-2">{product.price}</p>
            </div>

            {/* View Button */}
            <div>

            <button className=" w-24 bg-[#789CBB] text-white py-2 rounded-lg hover:bg-blue-500">
              View
            </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopPicks;
