"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from './sidebar';
import Loginauth from './authorization/page'; // Adjust path if needed

export default function HomePage() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    const hash = window.location.hash;

    // If there's a token in the URL hash, extract and store it
    if (!storedToken && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      
      // Clear the hash from the URL
      window.location.hash = "";
    } else {
      setToken(storedToken);
    }
  }, []);

  return !token ? (
    <Loginauth /> // Render the Login component if there's no token
  ) : (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <nav>
          <ul>
            <li><Link href="/library">Library</Link></li>
            <li><Link href="/feed">Feed</Link></li>
            <li><Link href="/trending">Trending</Link></li>
            <li><Link href="/player">Player</Link></li>
            <li><Link href="/favorites">Favorites</Link></li>
          </ul>
        </nav>
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
