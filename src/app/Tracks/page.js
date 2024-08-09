'use client'; // Add this line at the top

import React, { useEffect, useState } from 'react';
import apiClient, { setClientToken } from '../axios/page.js'; // Adjust the import path as necessary

const Tracks = () => {
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState(null);
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;

  useEffect(() => {
    if (token) {
      setClientToken(token);
      apiClient.get('me/tracks')
        .then(response => {
          console.log(response.data); // Check the response structure
          // Adjust the path if necessary based on actual response structure
          setTracks(response.data.items || response.data.tracks.items);
        })
        .catch(error => {
          console.error('Error fetching tracks:', error);
          setError('Failed to fetch tracks.');
        });
    } else {
      setError('No authentication token found.');
    }
  }, [token]);

  return (
    <div className="flex flex-col h-full bg-black p-4 overflow-y-auto">
      {error && <div className="text-red-500">{error}</div>}
      {tracks ? (
        <div className="flex flex-wrap gap-4"> {/* Container for inline items */}
          {tracks.map((track) => (
            <div key={track.id} className="flex flex-col items-center p-2 text-white rounded shadow w-40">
              {/* Check if track.album.images exists and has at least one image */}
              {track.album && track.album.images && track.album.images.length > 0 && (
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              )}
              <div className="text-center">{track.name}</div>
            </div>
          ))}
        </div>
      ) : (
        !error && <div>Loading tracks...</div>
      )}
    </div>
  );
};

export default Tracks;
