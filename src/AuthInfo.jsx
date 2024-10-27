import {redirectToAuthCodeFlow} from "./oidc.js";

export default function AuthInfo() {
    function redirect() {
        redirectToAuthCodeFlow();
    }
    return (
        <>
            <div className="text text-gray-900 dark:text-white">
                You will be re-directed to Spotify to login and verify sharing data.
            </div>
            <br/>
            <div className="flex items-center justify-left">
                <button type="button" id="regButton" onClick={redirect}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    Lets Go!
                </button>
            </div>
        </>
    );
}
