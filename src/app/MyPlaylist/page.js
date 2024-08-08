"use client"; // Add this line at the top

import React, { useEffect, useState } from "react";
import apiClient, { setClientToken } from "../axios/page.js"; // Adjust the import path as necessary

const MyPlaylist = () => {
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("access_token")
      : null;

  useEffect(() => {
    if (token) {
      setClientToken(token);
      apiClient
        .get("me/playlists")
        .then((response) => {
          console.log("Playlists fetched:", response.data.items);//log the fetched playlists for debugging
          setPlaylists(response.data.items);
        })
        .catch((error) => {
          console.error("Error fetching playlists:", error);
          setError("Failed to fetch playlists.");
        });
    } else {
      setError("No authentication token found.");
    }
  }, [token]);

  return (
    <div className="flex flex-col h-full bg-black p-4 overflow-y-auto">
      {error && <div className="text-red-500">{error}</div>}
      {playlists ? (
        <div className="flex flex-wrap gap-4">
          {" "}
          {/* Container for inline items */}
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="flex flex-col items-center p-2 text-white rounded shadow w-40 hover:scale-110 transition duration-300 ease-in-out"
            >
              {/* Check if playlist.images exists and has at least one image */}
              {playlist.images && playlist.images.length > 0 && (
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              )}
              <div className="text-center overflow-hidden text-ellipsis whitespace-nowrap w-32">
                {playlist.name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !error && <div>Loading playlists...</div>
      )}
    </div>
  );
};

export default MyPlaylist;
