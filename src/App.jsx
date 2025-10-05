import React from 'react'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebRoutes from './WebRoutes/WebRoutes'
import Footer from './common/Footer/Footer';

function App() {


  return (
    <>
       <ToastContainer position="top-right" autoClose={3000} />
       <WebRoutes/>
       <Footer/>
  
    </>

  )
}

export default App
