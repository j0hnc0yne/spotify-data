import {redirectUri} from "./oidc.js";

const BASE_URL = "https://api.spotify.com/v1";

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
