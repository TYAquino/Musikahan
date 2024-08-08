<<<<<<< Updated upstream
import React from "react";

export default function Player(){
  return (
    <div className="bg-purple-400 w-full h-full p-4"> {/* Ensure full width and height */}
        <h1 className="text-white text-2xl">Player</h1>
        {/* Add content here */}
      </div>

  );
}
=======
"use client";
import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
}
>>>>>>> Stashed changes
