import React from 'react';

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
        className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white z-10 text-center px-4">
          About Us
        </h1>
      </section>

      {/* Brand Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-6 sm:mb-8">
          Brand Story
        </h2>
        <div className="space-y-4 sm:space-y-6">
          <p className="text-base sm:text-lg leading-relaxed text-center text-gray-700 max-w-4xl mx-auto">
            DVYB Was Born With A Vision To Make Ethnic Fashion Timeless Yet Effortless. In India, Every Weave Tells A Story — From The Grace Of Kanchipuram Silks To The Artistry Of Kota Doria And The Elegance Of Banarasi Sarees. But Bringing These Traditions To Modern Shoppers, Especially Online, Often Felt Complicated.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-center text-gray-700 max-w-4xl mx-auto">
            That's Why DVYB Blends Technology With Tradition. Through Our 2D And 3D Virtual Try-Ons, We Don't Just Show — We Help Experience How A Saree, Lehenga, Or Ethnic Outfit Looks On You Before Making A Choice. We Bring Together Regional Weaves, Heritage Crafts, And Festive Collections Under One Platform, Making It Simple For Anyone, Anywhere, To Embrace India's Rich Culture In Style.
          </p>
        </div>
        
        {/* Story Images */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
          <div className="w-full sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-pink-200 to-purple-300 rounded-2xl shadow-md flex items-center justify-center">
            <span className="text-gray-600 text-sm text-center px-4">Saree Collection Image</span>
          </div>
          <div className="w-full sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-orange-200 to-pink-300 rounded-2xl shadow-md flex items-center justify-center">
            <span className="text-gray-600 text-sm text-center px-4">Ethnic Wear Image</span>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-8 sm:mb-10">
            Mission & Vision
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-purple-600">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  To Make Ethnic Fashion Accessible, Interactive, And Authentic. We Want Shoppers To Discover The Beauty Of Traditional Sarees And Ethnic Wear While Enjoying A Modern, Tech-Driven Shopping Experience With Features Like Virtual Try-Ons, Personalized Curation, And Seamless Browsing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-purple-600">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  To Become The Go-To Digital Destination For Ethnic Wear Worldwide — Celebrating India's Diverse Handlooms, Crafts, And Designs, While Reimagining The Shopping Journey With Technology. We Aim To Connect Generations To Their Roots By Offering Heritage Pieces With A Modern Twist And A Shopping Experience That Feels Immersive, Inspiring, And Inclusive.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-12">
            Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {[
              {
                title: 'Celebrating Tradition',
                desc: 'We honor India\'s regional artistry by curating pieces and ethnic wear that carry forward the legacy of our culture.',
                icon: '🎨'
              },
              {
                title: 'Tech-Enabled Experience',
                desc: 'From 2D previews to 3D virtual try-ons, we use innovation to make shopping more immersive and trustworthy.',
                icon: '💻'
              },
              {
                title: 'Quality & Authenticity',
                desc: 'Every weave, embroidery, and design is sourced with care, maintaining originality and craftsmanship.',
                icon: '✨'
              },
              {
                title: 'Customer First',
                desc: 'Your comfort and confidence matter most. Our platform is built to give you clarity, convenience, and style while shopping.',
                icon: '❤️'
              },
              {
                title: 'Innovation in Ethnic Fashion',
                desc: 'We merge timeless designs with modern technology, ensuring heritage wear never goes out of style.',
                icon: '🚀'
              }
            ].map((item, index) => (
              <Card 
                key={index} 
                className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-12 sm:py-16 px-4 sm:px-6">
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
      </section>
    </div>
  );
}