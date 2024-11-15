import {redirectUri} from "./oidc.js";

const BASE_URL = "https://api.spotify.com/v1";

export async function getUserInfo(token) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
    const url = `${BASE_URL}/me`;
    const response = await fetch(url, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    if (response?.ok) {
        return await response.json();
    } else {
        console.log(`HTTP Response Code: ${response?.status}`)
        sessionStorage.setItem("spotAccess", "expired");
        document.location = "https://j0hnc0yne.github.io/spotify-data/?code=expired";
    }
}

export async function getTopTracks(token, type, timeRange, limit) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    const url = `${BASE_URL}/me/top/${type}?time_range=${timeRange}&limit=${limit}`;
    const response = await fetch(url, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    if (response?.ok) {
        return await response.json();
    } else {
        console.log(`HTTP Response Code: ${response?.status}`)
        sessionStorage.setItem("spotAccess", "expired");
        document.location = redirectUri + "code=expired";
    }
}

export async function createPlaylist(token, userId, name, description) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/create-playlist
    const url = `${BASE_URL}/users/${userId}/playlists`;
    const requestBody = {name: name, description: description};
    const response = await fetch(url, {
        method: "POST", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(requestBody)
    });
    if (response?.ok) {
        return await response.json();
    } else {
        console.log(`HTTP Response Code: ${response?.status}`)
        sessionStorage.setItem("spotAccess", "expired");
        document.location = redirectUri + "code=expired";
    }
}

export async function addToPlaylist(token, playlistId, uris) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
    const url = `${BASE_URL}/playlists/${playlistId}/tracks`;
    const requestBody = {uris: uris};
    const response = await fetch(url, {
        method: "POST", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(requestBody)
    });
    if (response?.ok) {
        return await response.json();
    } else {
        console.log(`HTTP Response Code: ${response?.status}`)
        sessionStorage.setItem("spotAccess", "expired");
        document.location = redirectUri + "code=expired";
    }
}
