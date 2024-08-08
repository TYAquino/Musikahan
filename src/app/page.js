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
      
    </div>

  );
}
