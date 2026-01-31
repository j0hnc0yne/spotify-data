import {useState} from 'react'
import {addToPlaylist, createPlaylist, getUserInfo} from "./spotifyApi.js";

export default function TopData({type, topData}) {
    const [playlistUrl, setPlaylistUrl] = useState(null);
    const items = topData?.items ?? [];

    async function makePlayList(e) {
        e.preventDefault();
        const token = sessionStorage.getItem("spotAccess");
        const userInfo = await getUserInfo(token);
        const name = "My Playlist - " + new Date().toISOString();
        const desc = "My cool list of top tracks";
        const userId = userInfo.id;
        const playlistInfo = await createPlaylist(token, userId, name, desc);
        const playlistId = playlistInfo.id;
        const uris = items.map(item => `spotify:track:${item.id}`);
        await addToPlaylist(token, playlistId, uris);
        setPlaylistUrl(playlistInfo.external_urls?.spotify ?? null);
    }

    return (
        <>
            {type === 'tracks' ?
                <div className="text-teal-400 pt-5 underline" id="playlistId">
                    <a href="#" onClick={makePlayList}>Create playlist with below tracks</a>
                    {playlistUrl ? (
                        <div className="pt-2">
                            <a href={playlistUrl} target="_blank" rel="noreferrer">Check out your new playlist</a>
                        </div>
                    ) : null}
                    <br/>
                </div>
                : <br/>
            }
            <div className="text-left w-full pt-5">
                <ol className="text-left w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
                    {items.map(item => (
                        <li key={item.id}>{item.name}
                            {item.artists ? " by " : ""}
                            {item.artists?.map(artist => artist.name).join(', ')}
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}
