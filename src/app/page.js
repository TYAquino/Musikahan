"use client";
 
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from './sidebar';
import Loginauth from './authorization/page'; // Adjust path if needed
 
export default function HomePage() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const checkToken = () => {
      const storedToken = window.localStorage.getItem("token");
      const hash = window.location.hash;
 
      if (!storedToken && hash) {
        const _token = new URLSearchParams(hash.substring(1)).get('token');
        if (_token) {
          window.localStorage.setItem("token", _token);
          setToken(_token);
        }
        // Clear the hash from the URL
        window.location.hash = "";
      } else {
        setToken(storedToken);
      }
      setLoading(false);
    };
 
    checkToken();
  }, []);
 
  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }
 
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
  );
}
 
 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">    
      </div>

    </main>

  );
}
