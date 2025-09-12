import React from "react";

const OffersZone = () => {
  const categories = [
    {
      title: "Winter Wear",
      subtitle: "Dress up in a warmer vibe",
      offer: "UPTO 50% OFF",
      image: "https://res.cloudinary.com/doiezptnn/image/upload/v1756879598/Rectangle_74_nhvxxl.png",
      bg: "bg-[#192A3A] text-white",
    },
    {
      title: "Printed T-Shirt",
      subtitle: "New Designs Every Week",
      offer: "UPTO 40% OFF",
      img: "https://res.cloudinary.com/doiezptnn/image/upload/v1756879584/Rectangle_75_1_qvrnfk.png",
      bg: "bg-pink-200 text-gray-900",
    },
    {
      title: "Cargo Joggers",
      subtitle: "For Ultimate Comfort",
      offer: "UPTO 50% OFF",
      img: "https://res.cloudinary.com/doiezptnn/image/upload/v1756879626/Rectangle_76_rl87pl.png",
      bg: "bg-gray-100 text-gray-900",
    },
    {
      title: "Women Wear",
      subtitle: "Street Style Icon",
      offer: "FLAT 60% OFF",
      img: "https://res.cloudinary.com/doiezptnn/image/upload/v1756879583/Rectangle_77_lpjwrz.png",
      bg: "bg-white text-gray-900",
    },
    {
      title: "Oversized T-Shirts",
      subtitle: "Street Style Icon",
      offer: "FLAT 60% OFF",
      img: "https://res.cloudinary.com/doiezptnn/image/upload/v1756879583/Rectangle_78_ao0u01.png",
      bg: "bg-yellow-400 text-gray-900",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              
      
      >
        {/* First Row */}

        <div
          className={`${categories[0].bg} flex flex-col sm:flex-row items-center justify-between rounded-xl p-6 w-[430px] h-[431px]`}
          // style={{ opacity: 1 }}
          style={{backgroundImage: `url(${categories[0].image})`, backgroundSize: 'cover', 
            }}
          
        >
          {/* Text Content */}
          <div className="flex flex-col justify-between flex-1"
          
          
          >
            <h3 className="text-2xl font-bold">{categories[0].title}</h3>
            <p>{categories[0].subtitle}</p>
            <p className="mt-2 font-semibold">{categories[0].offer}</p>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">
              SHOP NOW
            </button>
          </div>

          {/* Product Image */}
          <div className="flex-1 flex justify-center" 

          
          >
            <img
              src={categories[0].image}
              alt={categories[0].title}
              className="w-full max-w-[200px] object-contain rounded-lg pt-2"
            />
          </div>
        </div>


        {/* 2nd image */}

        <div className={`${categories[1].bg} rounded-xl p-6`} 
          style={{backgroundImage: `url(${categories[1].img})`, backgroundSize: 'cover', 
            }}
        >
          <h3 className="text-2xl   text-end font-bold">{categories[1].title}</h3>
          <p className="text-end pt-11">{categories[1].subtitle}</p>
          <p className="mt-2 text-end pt-4 font-semibold">{categories[1].offer}</p>
         <div className="items-end pt-3 flex justify-end">

          <button className="mt-4  bg-black text-white px-4 py-2 rounded-lg border-2 border-white">SHOP NOW</button>
         </div>
        </div>

        <div className={`${categories[2].bg} rounded-xl p-6`}  
          style={{backgroundImage: `url(${categories[2].img})`, backgroundSize: 'cover', 
            }}
        >
          <h3 className="text-2xl font-bold">{categories[2].title}</h3>
          <p>{categories[2].subtitle}</p>
          <p className="mt-2 font-semibold">{categories[2].offer}</p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">SHOP NOW</button>
        </div>

        {/* Second Row */}
        <div className={`${categories[3].bg} rounded-xl p-6 col-span-1 sm:col-span-2` 
      
      }
        style={{backgroundImage: `url(${categories[3].img})`, backgroundSize: 'cover', 
            }}
      >
          <h3 className="text-2xl font-bold">{categories[3].title}</h3>
          <p>{categories[3].subtitle}</p>
          <p className="mt-2 font-semibold">{categories[3].offer}</p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">SHOP NOW</button>
        </div>

        <div className={`${categories[4].bg} rounded-xl p-6`}
        
          style={{backgroundImage: `url(${categories[4].img})`, backgroundSize: 'cover', 
            }}
        >
          <h3 className="text-2xl font-bold">{categories[4].title}</h3>
          <p>{categories[4].subtitle}</p>
          <p className="mt-2 font-semibold">{categories[4].offer}</p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">SHOP NOW</button>
        </div>

      </div>

    </div>
  );
};

export default OffersZone;
