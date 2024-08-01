import React from 'react';

export default function Loginauth() {
  return (
    <div>
      <img
        src="/images/spotify.jpg"
        width={160}
        height={160}
        className="w-full h-full object-cover"
        alt="Logo"
      />
      <div>Login</div>
      <button onClick={() => window.location.href = authUrl}>Login with Spotify</button>
    </div>
  );
}

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'e1e243e9fd4647acbab74b4c154576ee';
const redirectUri = 'http://localhost:3000/';
const scopes = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
  'user-read-private'
].join(' ');

const authUrl = `${authEndpoint}?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
