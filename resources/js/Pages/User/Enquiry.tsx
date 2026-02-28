import React, { useState } from 'react';
import axios from 'axios';

const Enquiry: React.FC = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/enquiry', { message });
      setStatus('Enquiry submitted successfully!');
      setMessage('');
    } catch (error) {
      setStatus('Failed to submit enquiry.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Submit Enquiry</h1>
      <form onSubmit={handleSubmit}>
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
