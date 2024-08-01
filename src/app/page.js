"use client";

import React from 'react';
import Link from 'next/link';
import Sidebar from './sidebar'; // Adjusted import path to access components directory

export default function HomePage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <h1></h1>
        <li><Link href="/login">Login</Link></li>
        <nav>
          <ul>
            
            <li><Link href="/library">Library</Link></li>
            <li><Link href="/feed">Feed</Link></li>
            <li><Link href="/trending">Trending</Link></li>
            <li><Link href="/player">Player</Link></li>
            <li><Link href="/favorites">Favorites</Link></li>
          </ul>
        </nav>
        {/* Add content for the main page here */}
      </main>
    </div>
  );
}
