import {addToPlaylist, createPlaylist, getUserInfo} from "./spotifyApi.js";

export default function TopData(type, topData) {
    console.log(JSON.stringify(topData));
    const items = topData.items;

    async function makePlayList() {
        const token = sessionStorage.getItem("spotAccess");
        // First fetch user info to get userId
        const userInfo = await getUserInfo(token);
        const name = "My Playlist - " + new Date().toISOString();
        const desc = "My cool list of top tracks";
        const userId = userInfo.id;
        // Next, Create Playlist
        const playlistInfo = await createPlaylist(token, userId, name, desc);
        const playlistId = playlistInfo.id;
        const uris = topData.items.map(
            item => `spotify:track:${item.id}`
        );
        // Last, add all tracks to list
        await addToPlaylist(token, playlistId, uris);
        let link = document.createElement("a");
        let txt = document.createTextNode("Check out your new playlist");
        link.appendChild(txt);
        link.title ="Open new playlist";
        // set the href property
        link.href = playlistInfo.external_urls.spotify;
        link.target = "_blank";
        let el =  document.getElementById("playlistId");
        el.appendChild(link);
    }

    return (
        <>
            <div className="text-teal-400 pt-5 underline" id="playlistId">
                <a href="#" onClick={makePlayList}>Create playlist with below tracks</a>
                <br/>
            </div>
            <div className="text-left w-full pt-5">
                <ol className="text-left w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
                    {items.map(item => (
                        <li>{item.name}
                            {item.artists ? " by " : ""}
                            {item.artists?.map(artist => artist.name).join(', ')}
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}
