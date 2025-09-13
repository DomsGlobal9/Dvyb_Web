import { StrictMode } from 'react'
import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext.jsx';
import { FilterProvider } from './context/FilterContext.jsx';

createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
      <FilterProvider>
      <App />
      </FilterProvider>
      </SearchProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
