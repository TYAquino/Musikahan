'use client'; // Add this line at the top

import React, { useEffect, useState } from 'react';
import apiClient, { setClientToken } from '../axios/page.js'; // Adjust the import path as necessary

const Favorites = () => {
  const [artists, setArtists] = useState(null);
  const [error, setError] = useState(null);
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;

  useEffect(() => {
    if (token) {
      setClientToken(token);
      apiClient.get('me/following?type=artist')
        .then(response => {
          setArtists(response.data.artists.items);
        })
        .catch(error => {
          console.error('Error fetching artists:', error);
          setError('Failed to fetch artists.');
        });
    } else {
      setError('No authentication token found.');
    }
  }, [token]);

  return (
    <div className="bg-purple-300 w-full h-full p-4">
      {error && <div className="text-red-500">{error}</div>}
      {artists ? (
        artists.map((artist) => (
          <div key={artist.id} className="p-2 bg-white rounded shadow mb-2">
            {artist.name}
          </div>
        ))
      ) : (
        !error && <div>Loading artists...</div>
      )}
    </div>
  );
};

export default Favorites;
