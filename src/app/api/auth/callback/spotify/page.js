"use client";

import {useEffect } from 'react';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUrl = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL;
const tokenEndpoint = "https://accounts.spotify.com/api/token";

const getToken = async (code) => {
  const code_verifier = localStorage.getItem('code_verifier');
  console.log('code_verifier 02', code_verifier);

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}


export default function Spotify() {
  useEffect(() => {
    // console.log('clientId=' + clientId, 'redirectUrl=' + redirectUrl);

    // Define an async function inside the useEffect hook
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      try {
        const token = await getToken(code);
        // console.log('Token=>', token);

        if (undefined != token.access_token) {
          console.log('access_token', token.access_token);
          localStorage.setItem('access_token', token.access_token);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    // Call the async function
    fetchData();

    // Optionally, you can return a cleanup function
    return () => {
      // console.log('Component unmounted');
    };
  }, []);

  return (
    <div>
    </div>
  );
}