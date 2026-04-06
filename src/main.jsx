import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// Import biến router từ file routes.jsx của bạn
import router from './app/routes'; 

// Import CSS tổng của bạn (Tailwind, etc.)
import './styles/index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Giao toàn quyền định tuyến cho RouterProvider */}
    <RouterProvider router={router} />
  </React.StrictMode>
);