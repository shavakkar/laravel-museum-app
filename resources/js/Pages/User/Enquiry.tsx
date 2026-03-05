import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

const Enquiry: React.FC = () => {
  const { props } = usePage(); 
  const user = props.auth?.user;

  const [email, setEmail] = useState(user ? user.email : '');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/enquiry', { message, email });
      setStatus('Enquiry submitted successfully!');
      setMessage('');
      if (!user) setEmail('');
    } catch {
      setStatus('Failed to submit enquiry.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Submit Enquiry</h1>
      <form onSubmit={handleSubmit}>
        {!user && (
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />
        )}
        {user && (
          <input
            type="email"
            value={email}
            disabled
            className="w-full border rounded p-2 mb-4 bg-gray-100"
          />
        )}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          rows={5}
          placeholder="Enter your enquiry..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
};

export default Enquiry;
