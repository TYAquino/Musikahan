"use client";

Magdalena
import React from 'react';
import Link from 'next/link';
import Sidebar from './sidebar'; // Adjusted import path to access components directory

export default function HomePage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <h1></h1>
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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        
        
      </div>
    </main>
main
  );
}
