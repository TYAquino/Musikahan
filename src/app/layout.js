// src/app/layout.js

import React from "react";
import Sidebar from "./sidebar"; // Adjust the import path as needed
import "./globals.css"; // Import your global CSS file
// import { AuthContextProvider } from '@/_utils/auth-context';

export default function Layout({ children }) {
  return (
    <html>
      <body className="min-h-screen bg-gray-100">
        <header className="bg-black flex">
          <Sidebar /> {/* Sidebar will be inside the header */}
          <main className="flex-1 p-4 overflow-auto">
            {" "}
            {/* Adjust ml-64 based on sidebar width */}
            {children}
          </main>
        </header>
      </body>
    </html>
  );
}
