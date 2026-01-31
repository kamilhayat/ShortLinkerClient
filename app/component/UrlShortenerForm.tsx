'use client';

import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/api';

export default function UrlShortenerForm() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!longUrl) return alert('Please enter a URL');
    console.log('Long URL:', longUrl);
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/short`,
        { longUrl: longUrl },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const fullUrl = response.data;
      const shortCode = fullUrl.substring(fullUrl.lastIndexOf('/') + 1);
      const frontendUrl = `${window.location.origin}/${shortCode}`;

      setShortUrl(frontendUrl);
    } catch (error) {
      alert('Error while shortening URL');
    }

    setLoading(false);
  };

  return (
    <div className='max-w-lg mx-auto p-6 bg-white shadow rounded-xl'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Short Linker 🔗</h2>

      <input
        type='text'
        placeholder='Enter Long URL...'
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className='w-full border p-3 rounded mb-4'
      />

      <button
        onClick={handleShorten}
        className='w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700'
      >
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>

      {shortUrl && (
        <div className='mt-4 text-center'>
          <p className='font-semibold'>Short URL:</p>
          <a
            href={shortUrl}
            target='_blank'
            className='text-blue-600 underline'
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
