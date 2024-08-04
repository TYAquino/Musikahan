"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUrl = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL;
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const scope = 'user-read-private user-read-email user-top-read user-follow-read';

async function redirectToSpotifyAuthorize() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest('SHA-256', data);

  const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  window.localStorage.setItem('code_verifier', code_verifier);
  console.log('code_verifier 01', code_verifier);

  const authUrl = new URL(authorizationEndpoint)
  const params = {
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

export default function Loginauth() {
  const router = useRouter();

  useEffect(() => {
    // console.log('clientId=' + clientId, 'redirectUrl=' + redirectUrl);
    // Check if there is an access token in the URL hash
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      
      if (token) {
        window.localStorage.setItem('token', token);
        router.push('/'); // Redirect to homepage
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <img
        src="/images/spotify.jpg"
        width={100}
        height={100}
        className="mb-4"
        alt="Spotify Logo"
      />
      <div className='text-lg font-semibold mb-4'>Login</div>
      <button
        onClick={redirectToSpotifyAuthorize}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Login with Spotify
      </button>
    </div>
  );
}
