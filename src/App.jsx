import TopInfo from "./TopInfo.jsx";
import {getAccessToken, redirectUri} from "./oidc.js";
import AuthInfo from "./AuthInfo.jsx";

const AT = "spotAccess";

function App() {
    const params = new URLSearchParams(window.location.search);
    let token = sessionStorage.getItem(AT);
    let code = params.get("code");
    if (token === "expired" || token === "undefined") {
        sessionStorage.removeItem("spotAccess");
        alert("Token is expired");
        token = null;
        code = null;
    }
    if (code && !token) {
        console.log("time to fetch accessToken");
        sessionStorage.setItem("spotAccess", "inprogress");
        getAccessToken(code).then(accessToken => {
            console.log("got token:", accessToken);
            sessionStorage.setItem(AT, accessToken);
            token = accessToken;
            document.location = redirectUri;
        });
    }

    return (
        <>
            <div className="bg-gray-50 dark:bg-gray-800">
                <div className="flex min-h-[80vh] flex-col py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Spotify Top Music
                        </h1>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        View your top Songs or Artists.
                    </h3>
                    <br/>
                    {(token && token !== "undefined" && token !== "inprogress" && token !== "expired")
                        ? <TopInfo></TopInfo> : <AuthInfo></AuthInfo>
                    }
                </div>
            </div>
        </>
    )

}

export default App
