'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/db-test')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError('Backend not reachable'));
  }, []);
  
  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Admin Panel – Backend Test</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <pre
          style={{
            padding: '20px',
            marginTop: '20px'
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}

// Shishir I am here
//hello
// Hello from sagar
// Hello from sagar again