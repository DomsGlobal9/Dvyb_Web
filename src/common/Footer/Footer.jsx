import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Footerlog1 from "../../assets/Navbar/B2cLogo.png";
import Footerlog2 from "../../assets/FooterImages/digiwarehouse_logo.svg";
import Footerlog3 from "../../assets/FooterImages/digiwholesale_logo.svg";
import logo from '../../assets/logo/NavLogo.png'
import footerbottomlogo01 from "../../assets/FooterImages/Guarantee.png";
import footerbottomlogo02 from "../../assets/FooterImages/ReturnIcon.png";
import { Link, useNavigate } from "react-router-dom";
import GooglePlay from '../../assets/FooterImages/GooglePlay.svg'
import AppStore from '../../assets/FooterImages/AppStore.svg'
  
const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="bg-white text-gray-700 pt-8 pb-6">
      {/* Logo at top */}
      <div className="flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <img src={logo} alt="logo" className="h-[28.46px] object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* ONLINE SHOPPING - Mobile Only */}
          <div className="flex flex-col space-y-3 md:hidden">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wide text-sm">
              ONLINE SHOPPING
            </h3>
            <Link to="/products" className="text-gray-700 hover:text-gray-900 uppercase text-sm">
              WOMEN
            </Link>
            <a href="#" className="text-gray-700 uppercase text-sm">
              MEN{" "}
              <sup className="text-[10px] text-gray-500">(COMING SOON)</sup>
            </a>
            <a href="#" className="text-gray-700 uppercase text-sm">
              KIDS{" "}
              <sup className="text-[10px] text-gray-500">(COMING SOON)</sup>
            </a>
          </div>


          {/* SHOP - Desktop Only */}
          <div className="hidden md:flex flex-col mt-[42.67px]  space-y-3">
            <h3 className="font-semibold  font-outfit text-gray-900 uppercase tracking-wide">
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

          {/* OUR COMPANY - Mobile, DVYB WHOLESALE - Desktop */}
          <div className="flex flex-col space-y-3 md:mt-[42.67px] ">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wide text-sm md:text-base">
              <span className="md:hidden">OUR COMPANY</span>
              <span className="hidden font-semibold  font-outfit md:inline">DVYB WHOLESALE</span>
            </h3>

            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-900 text-sm md:text-base uppercase md:capitalize md:hidden"
            >
              CONTACT US
            </Link>

            <Link to="/faq" className="text-gray-600 font-Outfit hover:text-gray-900 text-sm md:text-base uppercase md:capitalize">
              FAQ
            </Link>

            <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base uppercase md:hidden">
              TERMS & CONDITIONS
            </Link>

            <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base uppercase md:hidden">
              TRACK YOUR ORDER
            </Link>

            <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base uppercase md:hidden">
              SHIPPING
            </Link>

            <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base uppercase md:hidden">
              CANCELLATION
            </Link>

            <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base uppercase md:hidden">
              RETURNS
            </Link>

            <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base uppercase md:hidden">
              PRIVACY POLICY
            </Link>

            {/* Desktop links */}
            <Link
              to="/tryon"
              className="text-gray-600 hover:text-gray-900 items-center space-x-2 hidden md:flex"
            >
              <span>2D Try On</span>
            </Link>

            <Link to="/aboutUs" className="text-gray-600 hover:text-gray-900 hidden md:block">
              About Us
            </Link>
          </div>

          {/* FROM DVYB - Desktop Only */}
          <div className="hidden md:flex flex-col space-y-3 md:mt-[42.67px] ">
            <h3 className=" font-semibold  font-outfit text-gray-900 uppercase tracking-wide">
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
          <div className="flex flex-col space-y-3 max-w-xs md:mt-[42.67px] ">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wide text-sm md:text-base">
              DOWNLOAD THE DVYB APP
            </h3>
            <div className="flex flex-col space-y-3 mt-2">
              <a
                href="#"
                aria-label="Download on the App Store"
                className="inline-block"
              >
                <img
                  src={AppStore}
                  alt="App Store"
                  className="h-11  "
                />
              </a>
              <a
                href="#"
                aria-label="Get it on Google Play"
                className="inline-block"
              >
                <img
                  src={GooglePlay}
                  alt="Google Play"
                  className="h-11"
                />
              </a>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex flex-col space-y-3 md:mt-[42.67px] ">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wide text-sm md:text-base">
              FOLLOW US ON
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
       <div className=" flex  justify-center items-center gap-6 mt-[55.11px] flex-wrap">

  <img src={Footerlog1} alt="DVYB" className="md:h-5 h-4 hidden  md:block  -mt-4 object-cover" />
  
  <img src={Footerlog3} alt="DVYB WHOLESALE" className="md:h-11 h-9 hidden  md:block -mt-3 oject-cover" />
  <img src={Footerlog2} alt="DVYB DIGI WAREHOUSE" className="md:h-13 h-11 hidden  md:block -mt-1 object-cover" />
</div>


        {/* Bottom Section */}
        <div className="border-t border-gray-200  md:mt-12 pt-6 flex flex-col md:flex-row items-center md:items-center md:justify-between gap-6 text-left">
          {/* Guarantee */}
          <div className="flex items-start">
            <img src={footerbottomlogo01} alt="" className="w-12 md:w-16" />
            <p className="ml-2 text-xs">
              <span className="text-black font-outfit text-sm font-semibold">100% ORIGINAL</span> <span className="font-outfit text-[#000000B2] text-sm">guarantee for <br /> all products at dvyb.in</span>
            </p>
          </div>

          {/* Return Policy */}
          <div className="flex items-start">
            <img src={footerbottomlogo02} alt="" className="w-6 md:w-7" />
            <p className="ml-4 text-xs">
              <span className="text-black font-bold">
                RETURN WITHIN 14 DAYS
              </span> of <br /> receiving your order
            </p>
          </div>

                <div className=" md:hidden flex justify-center items-center gap-6 mt-[22.11px] flex-wrap">

  <img src={Footerlog1} onClick={()=>navigate('/B2BBulkOrders-home')} alt="DVYB" className="md:h-5 h-4  -mt-4 object-cover" />
 
  <a 
  href="https://www.digiwarehousedvyb.in" 
  target="_blank" 
  rel="noopener noreferrer"
>

  <img src={Footerlog3} alt="DVYB WHOLESALE" className="md:h-11 h-9 -mt-3 oject-cover" />
</a>
  <img src={Footerlog2} alt="DVYB DIGI WAREHOUSE" className="md:h-13 h-11 -mt-1 object-cover" />
</div>

          {/* Copyright & Links */}
         <div className="flex flex-row items-center justify-center text-xs uppercase w-full md:w-auto divide-x divide-gray-400">
  <p className="px-3 text-center font-outfit font-semibold text-[#000000B2]">
    COPYRIGHT © 2025 dvyb.in
  </p>
  <p className="px-3 text-center font-outfit font-semibold text-[#000000B2]">
    PRIVACY POLICY
  </p>
  <p className="px-3 text-center font-outfit font-semibold text-[#000000B2]">
    TERMS & CONDITIONS
  </p>
</div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;