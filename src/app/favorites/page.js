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
    <div className="flex flex-col h-full bg-black p-4 overflow-y-auto">
      {error && <div className="text-red-500">{error}</div>}
      {artists ? (
        <div className="flex flex-wrap gap-4">
        {artists.map((artist) => (
          <div key={artist.id} className="flex flex-col items-center p-2 text-white rounded shadow w-40">
          {artist.images && artist.images.length > 0 && (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              )}
          <div className="text-center">{artist.name}</div>
          </div>
        ))}
        </div>
      ) : (
        !error && <div>Loading artists...</div>
      )}
    </div>
  );
};

export default Favorites;
