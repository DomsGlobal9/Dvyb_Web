import React from 'react';
import aboutBg from "../assets/CommonAssets/aboutPageBg.png"
import redSaree from "../assets/CommonAssets/redSaree.png"
import saree2 from "../assets/CommonAssets/saree2.png"

// Custom Card components to replace the missing UI library
const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative w-full h-[70vh] sm:h-[60vh] lg:h-[90vh] flex items-center justify-center bg-cover  "
        style={{ backgroundImage: `url(${aboutBg})` }}
      >
        {/* <div className="absolute inset-0 bg-black/40"></div> */}
        <h1 className="relative flex justify-center align-bottom text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white z-10  px-4">
          About Us
        </h1>
      </section>


      {/* Brand Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-[#F8FCFF]">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-10 text-[#1E2A3A]">
          Brand Story
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          {/* Text Section */}
          <div className="lg:w-1/2 space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              DVYB Was Born With A Vision To Make Ethnic Fashion Timeless Yet
              Effortless. In India, Every Weave Tells A Story — From The Grace Of
              Kanchipuram Silks To The Artistry Of Kalamkari And The Elegance Of
              Banarasi Sarees. But Bringing These Traditions To Modern Shoppers,
              Especially Online, Often Felt Complicated.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              That’s Why DVYB Blends Technology With Tradition. Through Our 2D And 3D
              Virtual Try-On, You Don’t Just Shop — You Experience How A Saree,
              Lehenga, Or Ethnic Outfit Looks On You Before Making A Choice. We Bring
              Together Regional Weaves, Heritage Crafts, And Festive Collections Under
              One Platform, Making It Simple For Anyone, Anywhere, To Embrace India’s
              Rich Culture In Style.
            </p>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex items-center justify-center gap-6">
            <img
              src={redSaree}
              alt="Red Saree"
              className="w-1/2 rounded-lg shadow-md object-cover"
            />
            <img
              src={saree2}
              alt="Model Saree"
              className="w-1/2 rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </section>





      {/* Mission & Vision */}
      <section className="bg-[#F8FCFF] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 text-[#1E2A3A]">
            Mission & Vision
          </h2>

          {/* Mission */}
          <div className="text-left mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              To Make Ethnic Fashion Accessible, Interactive, And Authentic. We Want
              Shoppers To Discover The Beauty Of Traditional Sarees And Ethnic Wear
              While Enjoying A Modern, Tech-Driven Shopping Experience With Features
              Like Virtual Try-Ons, Personalized Curation, And Seamless Browsing.
            </p>
          </div>

          {/* Vision */}
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              To Become The Go-To Digital Destination For Ethnic Wear Worldwide —
              Celebrating India’s Diverse Handlooms, Crafts, And Designs, While
              Reimagining The Shopping Journey With Technology. We Aim To Connect
              Generations To Their Roots By Offering Heritage Pieces With A Modern
              Twist And A Shopping Experience That Feels Immersive, Inspiring, And
              Inclusive.
            </p>
          </div>
        </div>
      </section>


    {/* Core Values */}
<section className="bg-[#F8FCFF] py-12 sm:py-16 px-4 sm:px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E2A3A] mb-10">
      Core Values
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {[
        {
          title: "Celebrating Tradition",
          desc: "We honor India’s regional artistry by curating sarees and ethnic wear that carry forward the legacy of our culture.",
          icon: "🎨",
        },
        {
          title: "Tech-Enabled Experience",
          desc: "From 2D previews to 3D virtual try-ons, we use innovation to make shopping more immersive and trustworthy.",
          icon: "💻",
        },
        {
          title: "Quality & Authenticity",
          desc: "Every weave, embroidery, and design is sourced with care to maintain originality and craftsmanship.",
          icon: "✨",
        },
        {
          title: "Customer First",
          desc: "Your comfort and confidence matter most. Our platform is built to give you clarity, convenience, and joy while shopping.",
          icon: "❤️",
        },
        {
          title: "Innovation in Ethnic Fashion",
          desc: "We merge timeless designs with modern technology, ensuring heritage wear never goes out of style.",
          icon: "🚀",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 max-w-sm group hover:-translate-y-1"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold mb-3 text-[#1C4C74]">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Call to Action Section */}
      {/* <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Experience DVYB?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Discover our collection of traditional and contemporary ethnic wear with cutting-edge virtual try-on technology.
          </p>
          <button className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Explore Collection
          </button>
        </div>
      </section> */}
    </div>
  );
}