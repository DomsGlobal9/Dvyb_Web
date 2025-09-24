// import React, { use } from 'react'
// import Footer from '../../../common/Footer/Footer'
// import LandingPage from "../../Pages/LandingPage/LandingPage"
// import B2bnavbar from '../../../common/Navbar/b2bNavbar'
// import { useAuth } from '../../../context/AuthContext'
// import Navbar from '../../../common/Navbar/b2cNavbar'


// const HomePages = () => {
//   const{userRole}=useAuth();
//   console.log(userRole,"userRole");

//   return (
//     <>
//     {userRole==="B2C"?  <Navbar/>: <B2bnavbar/>}
//     {/* <B2bnavbar/> */}
//     <LandingPage />
//     <Footer />
//     </>
//   )
// }

// export default HomePages


import React from "react";
import { Navigate } from "react-router-dom";
import Footer from "../../../common/Footer/Footer";
import LandingPage from "../../Pages/LandingPage/LandingPage";
import B2BNavbar from "../../../common/Navbar/b2bNavbar";
import B2CNavbar from "../../../common/Navbar/b2cNavbar";

const HomePages = () => {

  return (
    <>
      <B2BNavbar />
      <LandingPage />
      <Footer />
    </>
  );
};

export default HomePages;
