// SpotifyEmbed.js
import React from 'react';

const SpotifyEmbed = ({ playlistId }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/playlist/${playlistId}`}
      width="300"
      height="380"
      frameBorder="0"
      allowTransparency="true"
      allow="encrypted-media"
      title="Spotify Playlist"
    ></iframe>
  );
};

export default SpotifyEmbed;
