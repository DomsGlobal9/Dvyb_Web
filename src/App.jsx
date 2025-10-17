import React from 'react'
import './App.css'
import { useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebRoutes from './WebRoutes/WebRoutes'
import Footer from './common/Footer/Footer';

// ✅ This wrapper should NOT render Footer on profile pages
function App() {
  const location = useLocation(); // Import useLocation from react-router-dom
  
  const hideFooterRoutes = ['/your-profile', '/account']; // Add your profile routes
  const shouldShowFooter = !hideFooterRoutes.some(route => 
    location.pathname.includes(route)
  );

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <WebRoutes />
        </main>
        {shouldShowFooter && <Footer />}
      </div>
    </>
  )
}



export default App
