// src/components/SpotifyPlayer.js

import React, { useEffect } from 'react';

const SpotifyPlayer = () => {
  useEffect(() => {
    const token = window.localStorage.getItem('access_token'); // Or however you manage tokens

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
      });

      // Error handling
      player.on('initialization_error', e => { console.error(e); });
      player.on('authentication_error', e => { console.error(e); });
      player.on('account_error', e => { console.error(e); });
      player.on('playback_error', e => { console.error(e); });

      // Playback status updates
      player.on('player_state_changed', state => { console.log(state); });

      // Ready
      player.on('ready', data => {
        console.log('Ready');
        // Get the Spotify API token and start playback
      });

      // Not Ready
      player.on('not_ready', data => {
        console.log('Web Playback SDK is not ready');
      });

      // Connect to the player!
      player.connect();
    };
  }, []);

  return <div id="spotify-player"></div>;
};

export default SpotifyPlayer;
