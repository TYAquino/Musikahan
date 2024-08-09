'use client'; // Add this line at the top

import React, { useEffect, useState } from 'react';
import apiClient, { setClientToken } from '../axios/page.js'; // Adjust the import path as necessary
import { FaPlay } from 'react-icons/fa'; // Import the play icon from react-icons

const Tracks = () => {
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState(null);
  const [iframeSrc, setIframeSrc] = useState('');
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;

  useEffect(() => {
    if (token) {
      setClientToken(token);
      apiClient.get('me/tracks')
        .then(response => {
          console.log(response.data); // Check the response structure
          setTracks(response.data.items || response.data); // Adjust the path if necessary based on actual response structure
        })
        .catch(error => {
          console.error('Error fetching tracks:', error);
          setError('Failed to fetch tracks.');
        });
    } else {
      setError('No authentication token found.');
    }
  }, [token]);

  const handleClick = (trackId) => {
    setIframeSrc(`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`);
  };

  return (
    <div className="flex flex-col h-full bg-black p-4 overflow-y-auto">
      {/* Header Section for Embed */}
      <div className="flex-none">
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            title="Spotify Track Player"
            width="100%"
            height="380"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ border: '1px solid black' }}
          />
        ) : (
          <div className="text-gray-500">Select a track to view it here.</div>
        )}
      </div>

      {/* Lower Section for Tracks */}
      <main className="flex-1 overflow-y-auto p-2">
        {error && <div className="text-red-500">{error}</div>}
        {tracks ? (
          tracks.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {tracks.map((track) => (
                <div
                  key={track.track.id}
                  className="relative flex flex-col items-center p-2 text-white rounded shadow w-40 bg-gray-900 hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
                  onClick={() => handleClick(track.track.id)}
                >
                  {/* Container for image and play button */}
                  <div className="relative">
                    {track.track.album.images && track.track.album.images.length > 0 && (
                      <img
                        src={track.track.album.images[0].url}
                        alt={track.track.name}
                        className="w-32 h-32 object-cover rounded mb-2"
                      />
                    )}
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <FaPlay className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center">{track.track.name}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>No tracks found.</div>
          )
        ) : (
          !error && <div>Loading tracks...</div>
        )}
      </main>
    </div>
  );
};

export default Tracks;
