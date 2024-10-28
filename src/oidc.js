const clientId = "2aa923dd520445aaa8958353cfe52b1d";
const redirectUri = window.location.href.includes("localhost") ?
    "http://localhost:5173/" : "https://j0hnc0yne.github.io/spotify-data/";

export function redirectToAuthCodeFlow() {
    const verifier = generateCodeVerifier(128);
    generateCodeChallenge(verifier).then(challenge => {
        sessionStorage.setItem("verifier", verifier);
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", redirectUri);
        params.append("scope", "user-read-private user-top-read playlist-modify-public");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);
        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    });
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getAccessToken(code) {
    const verifier = sessionStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    const { access_token } = await result.json();
    return access_token;
}

export {redirectUri};