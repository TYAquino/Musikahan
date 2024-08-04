'use client'; // Add this line at the top

import React, { useEffect, useState } from 'react';
import apiClient, { setClientToken } from '../axios/page.js'; // Adjust the import path as necessary

const Library = () => {
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

  useEffect(() => {
    if (token) {
      setClientToken(token);
      apiClient.get('me/playlists')
        .then(response => {
          setPlaylists(response.data.items);
        })
        .catch(error => {
          console.error('Error fetching playlists:', error);
          setError('Failed to fetch playlists.');
        });
    } else {
      setError('No authentication token found.');
    }
  }, [token]);

  return (
    <div className="bg-purple-300 w-full h-full p-4">
      {error && <div className="text-red-500">{error}</div>}
      {playlists ? (
        playlists.map((playlist) => (
          <div key={playlist.id} className="p-2 bg-white rounded shadow mb-2">
            {playlist.name}
          </div>
        ))
      ) : (
        !error && <div>Loading playlists...</div>
      )}
    </div>
  );
};

export default Library;
