'use client'

import { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        setData(data);
      });
  }, []);

  return (
    <div>
      {data ? data.message : "Loading..."}
    </div>
  )
}

export default MyComponent;