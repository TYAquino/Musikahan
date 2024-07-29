// src/app/layout.js

import React from 'react';
import Sidebar from './sidebar'; // Adjust the import path as needed
import './globals.css'; // Import your global CSS file

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-64"> {/* Adjust ml-64 based on sidebar width */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
