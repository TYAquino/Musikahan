'use client';

import React, { useEffect, useState } from 'react';
import apiClient, { setClientToken } from '../axios/page.js'; // Adjust the import path as necessary
import { FaPlay } from 'react-icons/fa';

const MyPlaylist = () => {
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;

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

  const handlePlaylistClick = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  // Construct the embed URL using the selected playlist ID
  const embedUrl = selectedPlaylistId ? `https://open.spotify.com/embed/playlist/${selectedPlaylistId}?utm_source=generator` : '';

  return (
    <div className="flex flex-col h-screen ml-10 bg-black p-2 scrollbar-hide">
    
      {/* Header Section for Embed */}
      <header className="h-72 w-full bg-black scrollbar-hide"> {/* Adjust the height of the header */}
        {embedUrl && (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
            style={{ display: 'block', width: '100%', height: '100%' }}
          ></iframe>
        )}
      </header>

      {/* Lower Section for Playlist */}
      <main className="flex-1 overflow-y-auto p-2">
        {error && <div className="text-red-500">{error}</div>}
        {playlists ? (
          <div className="flex flex-wrap gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="relative flex flex-col items-center scrollbar-hide p-2 text-white rounded shadow w-40 text-wrap bg-gray-900 hover:scale-110 transition duration-300 ease-in-out"
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                {/* Container for image and play button */}
                <div className="relative">
                  {playlist.images && playlist.images.length > 0 && (
                    <img
                      src={playlist.images[0].url}
                      alt={playlist.name}
                      className="w-32 h-32 object-cover rounded mb-2"
                    />
                  )}
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 scrollbar-hide">
                    <FaPlay className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center">{playlist.name}</div>
              </div>
            ))}
          </div>
        ) : (
          !error && <div>Loading playlists...</div>
        )}
      </main>
    </div>
  );
};

export default MyPlaylist;
