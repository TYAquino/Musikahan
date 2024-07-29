"use client";
// src/components/sidebar.js
import React from 'react';
import SideButtons from './sidebuttons'; // Importing SideButtons from the same directory

export default function Sidebar() {
  return (
    <div className="bg-[#311c74] text-white w-64 h-screen fixed top-0 left-0 flex flex-col p-4">
      <div className="flex flex-row items-center mb-8">
        <div className="w-17 h-19">
          <img
            src="/images/note.jpg"
            width={64}
            height={64}
            className="rounded-full border-2 border-white"
            alt="Note"
          />
        </div>
        <div className="ml-4">Username</div>
      </div>
      <div className="flex flex-col space-y-4">
        <SideButtons title="Feed" to="/feed" imageSrc="/images/feed.png" />
        <SideButtons title="Favorites" to="/favorites" imageSrc="/images/favorite.png" />
        <SideButtons title="Trending" to="/trending" imageSrc="/images/trending.png" />
        <SideButtons title="Player" to="/player" imageSrc="/images/player.png" />
        <SideButtons title="Library" to="/library" imageSrc="/images/library.png" />
      </div>
    </div>
  );
}
