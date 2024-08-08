// src/app/sidebar.js
"use client";
import React from 'react';
import SideButtons from './sidebuttons'; // Importing SideButtons from the same directory
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="bg-[#090615] text-white w-50 flex flex-col p-4 shadow-lg rounded-lg"> {/* Adjust width and height */}

      <div className="flex items-center">
        <div className="w-32 h-24"> {/* Container for logo */}
          <img
            src="/images/picture1.png"
            width={160}
            height={160}
            className="w-full h-full object-cover "
            alt="Logo"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        <SideButtons title="My Playlist" to="/MyPlaylist" imageSrc="/images/library.png" />
        <SideButtons title="Favorites" to="/favorites" imageSrc="/images/favorite.png" />
        <SideButtons title="Trending" to="/trending" imageSrc="/images/trending.png" />
        
      </div>
    </div>
  );
}
