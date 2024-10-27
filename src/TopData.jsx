
export default function TopData(type, topData) {
    console.log(JSON.stringify(topData));
    const items = topData.items;
    return (
        <>
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
