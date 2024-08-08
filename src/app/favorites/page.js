"use client"; // Add this line at the top

import React, { useEffect, useState } from "react";
import apiClient, { setClientToken } from "../axios/page.js"; // Adjust the import path as necessary
import AudioPlayer from "../components/AudioPlayer"; // Import the AudioPlayer component

const Favorites = () => {
  const [artists, setArtists] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null); // State to manage the currently selected track
  const [error, setError] = useState(null);
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("access_token")
      : null;

  useEffect(() => {
    if (token) {
      setClientToken(token);
      apiClient
        .get("me/following?type=artist")
        .then((response) => {
          setArtists(response.data.artists.items);
        })
        .catch((error) => {
          console.error("Error fetching artists:", error);
          setError("Failed to fetch artists.");
        });
    } else {
      setError("No authentication token found.");
    }
  }, [token]);

  // Function to handle click and set the selected track
  const handleTrackClick = (trackUrl) => {
    console.log('Track URL:', trackUrl); // Verify URL
    setSelectedTrack(trackUrl);
  };

  return (
    <div className="flex flex-col h-full bg-black p-4 overflow-y-auto">
      {error && <div className="text-red-500">{error}</div>}
      {artists ? (
        <div className="flex flex-wrap gap-4">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="flex flex-col items-center p-2 text-white rounded shadow w-40 hover:scale-110 transition duration-300 ease-in-out"
            >
              {artist.images && artist.images.length > 0 && (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              )}
              <div className="text-center">{artist.name}</div>
              <button
                onClick={() => handleTrackClick('ACTUAL_TRACK_URL')} // Replace with actual track URL
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Play Track
              </button>
            </div>
          ))}
        </div>
      ) : (
        !error && <div>Loading artists...</div>
      )}
      {selectedTrack && <AudioPlayer src={selectedTrack} />}
    </div>
  );
};

export default Favorites;
