"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import crypto2 from 'crypto'

// const authEndpoint = 'https://accounts.spotify.com/authorize';
// const clientId = 'e1e243e9fd4647acbab74b4c154576ee'; // Ensure this is your correct Client ID
// const redirectUri = 'http://localhost:3000/api/auth/callback/spotify'; // Make sure this matches exactly with what is in Spotify app settings
// const scopes = [
//   'playlist-read-private',
//   'playlist-read-collaborative',
//   'user-library-read',
//   'user-read-private'
// ].join(' ');

// const authUrl = `${authEndpoint}?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

// Authorization Code with PKCE Flow

// const generateRandomString = (length) => {
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const values = crypto.getRandomValues(new Uint8Array(length));
//   return values.reduce((acc, x) => acc + possible[x % possible.length], "");
// }

// const sha256 = async (plain) => {
//   const encoder = new TextEncoder()
//   const data = encoder.encode(plain)
//   return window.crypto.subtle.digest('SHA-256', data)
//   // return crypto2.createHash('sha256').update(plain).digest('hex');
// }

// const base64encode = (input) => {
//   return btoa(String.fromCharCode(...new Uint8Array(input)))
//     .replace(/=/g, '')
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_');
// }

// const authenticateWithSpotify = async () => {
//   const codeVerifier  = generateRandomString(64);
//   window.localStorage.setItem('code_verifier', codeVerifier);
//   console.log('codeVerifier 1', codeVerifier);

//   const hashed = await sha256(codeVerifier);
//   const codeChallenge = base64encode(hashed);

//   const clientId = 'e1e243e9fd4647acbab74b4c154576ee';
//   const redirectUri = 'http://localhost:3000/api/auth/callback/spotify';

//   const scope = 'user-read-private user-read-email';
//   const authUrl = new URL("https://accounts.spotify.com/authorize")

//   const params =  {
//     response_type: 'code',
//     client_id: clientId,
//     scope,
//     code_challenge_method: 'S256',
//     code_challenge: codeChallenge,
//     redirect_uri: redirectUri,
//   }

//   authUrl.search = new URLSearchParams(params).toString();
//   window.location.href = authUrl.toString();
// }

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUrl = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL;
// const clientId = '12f6d25b37d64f98a0a112c0e98a77a4'; // your clientId
// const redirectUrl = 'http://localhost:8080';        // your redirect URL - must be localhost URL and/or HTTPS
// const clientId = '2ffed5e48f72467d82a858f1890e9f8f'; // your clientId
// const redirectUrl = 'http://localhost:3000/api/auth/callback/spotify';        // your redirect URL - must be localhost URL and/or HTTPS

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const scope = 'user-read-private user-read-email';

async function redirectToSpotifyAuthorize() {
  console.log('clientId=' + clientId, 'redirectUrl=' + redirectUrl);
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
    console.log('clientId=' + clientId, 'redirectUrl=' + redirectUrl);
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
