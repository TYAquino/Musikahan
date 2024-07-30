const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'e1e243e9fd4647acbab74b4c154576ee';
const redirectUri = 'http://localhost:3000/';
const scopes = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
  'user-read-private'
].join(' ');

const authUrl = `${authEndpoint}?response_type=token&client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

console.log(authUrl);
