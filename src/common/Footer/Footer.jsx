import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Footerlog1 from "../../assets/Navbar/DVYB_Enterprise_Logo.png";
import Footerlog2 from "../../assets/FooterImages/footerlog2.png";
import Footerlog3 from "../../assets/FooterImages/footerlog3.png";
import logo from "../../assets/Navbar/DVYB_Enterprise_Logo.png";
import footerbottomlogo01 from "../../assets/FooterImages/Guarantee.png";
import footerbottomlogo02 from "../../assets/FooterImages/ReturnIcon.png";
import { Link } from "react-router-dom";
import { LinkIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 pt-8 pb-6">
      {/* Logo at top */}
      <div className="flex justify-center md:justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <img src={logo} alt="logo" className="h-10 object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        {/* Main Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {/* SHOP */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wide">
              SHOP
            </h3>
            <Link to="/products" className="text-gray-700 hover:text-gray-900 uppercase">
              Women
            </Link>
            <a href="#" className="text-gray-700 uppercase">
              MEN{" "}
              <sup className="text-xxs text-gray-500">(coming soon)</sup>
            </a>
            <a href="#" className="text-gray-700 uppercase">
              KIDS{" "}
              <sup className="text-xxs text-gray-500">(coming soon)</sup>
            </a>
          </div>

          {/* WHOLESALE LINKS */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wide">
              DVYB WHOLESALE
            </h3>

            <Link
              to="/tryon"
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
            >
              <span>2D Try On</span>
            </Link>

            <Link to="/aboutUs" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>

            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact Us
            </Link>

            <Link to="/faq" className="text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
          </div>

          {/* DVYB BRANDS */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wide">
              FROM DVYB
            </h3>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              DVYB
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Digi Warehouse
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Wholesale
            </a>
          </div>

          {/* APP LINKS */}
          <div className="flex flex-col space-y-3 max-w-xs">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wide">
              EXPERIENCE DVYB APP ON MOBILE
            </h3>
            <div className="flex flex-col sm:flex-row sm:space-x-4 sm:items-center mt-2">
              <a
                href="#"
                aria-label="Download on the App Store"
                className="inline-block"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-12"
                />
              </a>
              <a
                href="#"
                aria-label="Get it on Google Play"
                className="inline-block mt-2 sm:mt-0"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Google Play"
                  className="h-14"
                />
              </a>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wide">
              KEEP IN TOUCH
            </h3>
            <div className="flex space-x-4 mt-2 text-gray-600">
              <a href="#" aria-label="Facebook" className="hover:text-gray-900">
                <FaFacebookF size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-900">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-900">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-gray-900">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="flex flex-wrap justify-center  items-center mt-8 gap-6">
          <img src={Footerlog3} alt="DVYB WHOLESALE" className="h-7" />
          <img src={Footerlog2} alt="DVYB DIGI WAREHOUSE" className="h-16" />
          <img src={Footerlog1} alt="DVYB" className="h-14" />
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row items-center md:justify-between gap-6 text-center md:text-left">
          {/* Guarantee */}
          <div className="flex items-center text-left">
            <img src={footerbottomlogo01} alt="" className="w-16" />
            <p className="ml-2 text-xs">
              <span className="text-black font-bold">100% ORIGINAL</span>{" "}
              guarantee for <br /> all products at dvyb.in
            </p>
          </div>

          {/* Return Policy */}
          <div className="flex items-center text-left">
            <img src={footerbottomlogo02} alt="" className="w-7" />
            <p className="ml-2 text-xs">
              <span className="text-black font-bold">
                RETURN WITHIN 14 DAYS
              </span>{" "}
              of <br /> receiving your order
            </p>
          </div>

          {/* Copyright & Links */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs uppercase">
            <p>COPYRIGHT © 2025 dvyb.in</p>
            <p className="border-t md:border-t-0 md:border-x-2 border-gray-400 px-2">
              Privacy Policy
            </p>
            <p className="">Terms & Conditions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



// import React from 'react';
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
// import Footerlog1 from '../../../assets/Navbar/DVYB_Enterprise_Logo.png';
// import Footerlog2 from '../../../assets/FooterImages/footerlog2.png';
// import Footerlog3 from '../../../assets/FooterImages/footerlog3.png';
// import logo from "../../../assets/Navbar/DVYB_Enterprise_Logo.png";
// import footerbottomlogo01 from "../../../assets/FooterImages/Guarantee.png"
// import footerbottomlogo02 from "../../../assets/FooterImages/ReturnIcon.png"

// const Footer = () => {
//   return (
//     <footer className="bg-white text-gray-700 pt-8 pb-6">

//       <div className="flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  mt-6">
//         <img src={logo} alt="logo" className="h-10 object-contain" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  my-6">
//         <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-12">
//           {/* SELL ONLINE */}
//           <div className="flex flex-col space-y-3">
//             <h3 className="font-semibold text-gray-900 uppercase tracking-wide">SHOP </h3>
//             <a href="#" className="text-gray-700 hover:text-gray-900 uppercase">Women</a>
//             <a href="#" className="text-gray-700 uppercase">
//               MEN <sup className="text-xxs text-gray-500">(coming soon)</sup>
//             </a>
//             <a href="#" className="text-gray-700 uppercase">
//               KIDS <sup className="text-xxs text-gray-500">(coming soon)</sup>
//             </a>

//           </div>

//           {/* OUR COMPANY */}
//           <div className="flex flex-col space-y-3">
//             <h3 className="font-semibold text-gray-900 uppercase tracking-wide">DVYB WHOLESALE</h3>
//             <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
//               <span>2D try on</span>
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">About us</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Contact us</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a>
//           </div>

//           {/* from DVYB */}
//           <div className="flex flex-col space-y-3">
//             <h3 className="font-semibold text-gray-900 uppercase tracking-wide">DVYB WHOLESALE</h3>

//             <a href="#" className="text-gray-600 hover:text-gray-900">DVYB</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Digi Warehouse</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Wholesale</a>
//           </div>

//           {/* EXPERIENCE APP */}
//           <div className="flex flex-col space-y-3 max-w-xs">
//             <h3 className="font-semibold text-gray-900 uppercase tracking-wide">EXPERIENCE DVYB APP ON MOBILE</h3>
//             <div className="flex flex-col space-x-4 mt-2">
//               <a href="#" aria-label="Download on the App Store" className="inline-block">
//                 <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-12 ml-2" />
//               </a>
//               <a href="#" aria-label="Get it on Google Play" className="inline-block">
//                 <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" className="h-16" />
//               </a>
//             </div>
//           </div>
//           {/* KEEP IN TOUCH */}
//           <div className="flex flex-col space-y-3">
//             <h3 className="font-semibold text-gray-900 uppercase tracking-wide">KEEP IN TOUCH</h3>
//             <div className="flex space-x-4 mt-2 text-gray-600">
//               <a href="#" aria-label="Facebook" className="hover:text-gray-900"><FaFacebookF size={20} /></a>
//               <a href="#" aria-label="Instagram" className="hover:text-gray-900"><FaInstagram size={20} /></a>
//               <a href="#" aria-label="Twitter" className="hover:text-gray-900"><FaTwitter size={20} /></a>
//               <a href="#" aria-label="YouTube" className="hover:text-gray-900"><FaYoutube size={20} /></a>
//             </div>
//           </div>

//         </div>

//         <div className="flex justify-center md:justify-start items-center mt-8 pl-96 space-x-6">
//           <img src={Footerlog3} alt="DVYB WHOLESALE" className="h-7" />
//           <img src={Footerlog2} alt="DVYB DIGI WAREHOUSE" className="h-16" />
//           <img src={Footerlog1} alt="DVYB" className="h-14" />
//         </div>


//         {/* Logos and copyright */}
//         <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col items-center md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">

//           <div className='flex '>
//             <img src={footerbottomlogo01} alt="" className='w-16' />
//             <p className='ml-2 text-xs mt-2'><span className='text-black font-bold'>100% ORIGINAL</span> guarantee for <br /> all products at dvyb.in </p>
//           </div>

//           <div className='flex'>
//             <img src={footerbottomlogo02} alt="" className='w-7' />
//             <p className='ml-2 text-xs mt-2'><span className='text-black font-bold '>RETURN WITHIN 14 DAYS</span> of <br /> receiving your order </p>
//           </div>

//          <div className='flex'>
//            <p className=" px-2">
//             COPYRIGHT © 2025 dvyb.in
//           </p>
//           {/* <p className="text-center text-gray-400 text-xs"></p> */}
//           <p className='uppercase px-2 border-x-2 border-gray-400'>PRIVACY POlicy</p>
//           <p className='uppercase px-2'>terms & conditions</p>
//          </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
