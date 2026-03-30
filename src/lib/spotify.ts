// src/lib/spotify.ts

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${client_id}:${client_secret}`);

// Endpoints
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

// 1. Get Temporary Access Token
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

// 2. Fetch Live "Now Playing" Data
export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

// 3. Fetch Top Artists Data (Used for the charts)
export const getTopArtists = async (time_range = 'short_term') => {
  const { access_token } = await getAccessToken();

  return fetch(`${TOP_ARTISTS_ENDPOINT}?time_range=${time_range}&limit=50`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

// 4. Fetch Top Tracks Data
export const getTopTracks = async (time_range = 'short_term') => {
  const { access_token } = await getAccessToken();

  return fetch(`${TOP_TRACKS_ENDPOINT}?time_range=${time_range}&limit=10`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

// 5. Fetch Recently Played Tracks
export const getRecentlyPlayed = async (limit = 1) => {
  const { access_token } = await getAccessToken();

  return fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};