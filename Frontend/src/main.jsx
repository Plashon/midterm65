import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
import router from './routers/router.jsx'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from "./context/authContext.jsx";
import { BookProvider } from "./context/BookContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
        <BookProvider>
          <RouterProvider router={router} />{" "}
        </BookProvider>
      </AuthProvider>
  </React.StrictMode>
)
