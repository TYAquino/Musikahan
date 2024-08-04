"use client";

import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

// Set the Authorization header for requests
export const setClientToken = (token) => {
  apiClient.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    // Handle request errors
    return Promise.reject(error);
  });
};

// Handle responses and errors globally
apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle errors globally
  console.error('API call error:', error);
  return Promise.reject(error);
});

export default apiClient;
