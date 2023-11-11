import React, { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/data')  // Flask API URL
            .then((response) => response.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div>
            <p>{data ? data : "Loading data from Flask..."}</p>
        </div>
    );
}
