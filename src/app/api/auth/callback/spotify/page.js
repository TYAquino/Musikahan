"use client";

import {useEffect } from 'react';

const getToken = async (code) => {
  // stored in the previous step
  let codeVerifier = localStorage.getItem('code_verifier');
  console.log('codeVerifier', codeVerifier);

  const clientId = 'e1e243e9fd4647acbab74b4c154576ee';
  const redirectUri = 'http://localhost:3000/api/auth/callback/spotify';
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId, // <<
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri, // <<
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);
}


export default function Spotify() {
  useEffect(() => {
    // This code runs after the component mounts
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('Component mounted, code=>', code);
    // const token = getToken(code);
    // console.log('Token=>', token);

    getToken(code).then((token) => {
      console.log('Token=>', token);
    });

    // Optionally, you can return a cleanup function
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  return (
    <div>
    </div>
  );
}