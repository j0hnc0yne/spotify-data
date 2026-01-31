import { useState, useRef } from 'react'
import {getTopTracks} from "./spotifyApi.js";
import TopData from "./TopData.jsx";

function TopInfo() {
    const selectRef = useRef(null);
    const numberRef = useRef(null);
    const timeRef = useRef(null);
    const [topTracks, setTopTracks] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        document.getElementById("spinner").classList.remove("hidden");
        let token = sessionStorage.getItem("spotAccess");
        const tracks = await getTopTracks(token, selectRef.current.value, timeRef.current.value, numberRef.current.value);
        document.getElementById("spinner").classList.add("hidden");
        setTopTracks(tracks);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="pt-2">
                    <label htmlFor="selt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                        songs or artists</label>
                    <select id="selt" ref={selectRef}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="tracks">songs</option>
                        <option value="artists">artists</option>
                    </select>
                </div>

                <div className="pt-2">
                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                        amount to display</label>
                    <select id="number" ref={numberRef}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>

                <div className="pt-2">
                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                        a time range</label>
                    <select id="time" ref={timeRef}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="short_term">Short Term (~4 weeks)</option>
                        <option value="medium_term">Medium Term (~6 months)</option>
                        <option value="long_term">Long Term (~1 year)</option>
                    </select>
                </div>
                <br/>
                <div className="pt-2">
                    <button type="button" id="regButton" onClick={handleSubmit}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                        Get &apos;em
                    </button>
                </div>

                <div id="spinner" className="hidden flex gap-4 p-4 flex-wrap justify-left">
                    <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                         alt="Loading icon"/>
                </div>

            </form>
            <div>
                {topTracks ? <TopData type={selectRef.current.value} topData={topTracks} /> : null}
            </div>
        </>
    )
}

export default TopInfo
